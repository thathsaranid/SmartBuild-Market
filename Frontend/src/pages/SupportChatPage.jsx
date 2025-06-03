import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { chatAPI } from '../services/chat.service';
import socketService from '../services/socket.service';
import '../styles/SupportChatPage.css';

const SupportChatPage = () => {
  const { currentUser, isAuthenticated, userType } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatData, setChatData] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect for scrolling to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [activeUserId, chatData]);

  // Connect to socket.io when component mounts
  useEffect(() => {
    if (currentUser?._id) {
      socketService.connect();

      // Listen for new messages
      const unsubscribe = socketService.onMessage((messageData) => {
        console.log('Admin received message:', messageData);
        
        // Identify the user ID (the sender if it's not the admin)
        const userId = messageData.senderId !== currentUser._id ? messageData.senderId : messageData.receiverId;
        
        if (userId && (messageData.senderId !== currentUser._id)) {
          // Update chat data with the new message
          setChatData(prevChatData => {
            const prevMessages = prevChatData[userId] || [];
            return {
              ...prevChatData,
              [userId]: [
                ...prevMessages,
                { 
                  sender: 'User', 
                  text: messageData.message || messageData.content,
                  timestamp: new Date(messageData.time || messageData.timestamp || new Date())
                }
              ]
            };
          });
          
          // If this is the active user, mark messages as read
          if (userId === activeUserId && activeChatId) {
            chatAPI.markAsRead(activeChatId, currentUser._id).catch(err => {
              console.error('Error marking messages as read:', err);
            });
          }
        }
      });

      return () => {
        unsubscribe();
        socketService.disconnect();
      };
    }
  }, [currentUser, activeUserId, activeChatId]);

  // Load chat data
  useEffect(() => {
    if (isAuthenticated && currentUser?._id) {
      setLoading(true);
      
      // Fetch all chats for admin
      chatAPI.getChats(currentUser._id, 'admin')
        .then(response => {
          const chats = response.data || [];
          
          // Extract contacts from chats
          const extractedContacts = [];
          const extractedChatData = {};
          
          chats.forEach(chat => {
            // Find the user in participants (not the admin)
            const userParticipant = chat.participants.find(
              p => p.model === 'user' && p.userId
            );
            
            if (userParticipant && userParticipant.userId) {
              const userId = userParticipant.userId._id;
              const userName = userParticipant.userId.firstName && userParticipant.userId.lastName 
                ? `${userParticipant.userId.firstName} ${userParticipant.userId.lastName}`
                : userParticipant.userId.email || 'User';
              
              extractedContacts.push({
                id: userId,
                name: userName,
                chatId: chat._id,
                // Count unread messages
                unread: chat.messages.filter(m => 
                  m.receiverId === currentUser._id && !m.read
                ).length
              });
              
              // Format messages for the chat data
              const formattedMessages = chat.messages.map(msg => ({
                sender: msg.senderId === currentUser._id ? 'Support' : 'User',
                text: msg.content,
                timestamp: new Date(msg.timestamp),
                read: msg.read
              }));
              
              extractedChatData[userId] = formattedMessages;
            }
          });
          
          setContacts(extractedContacts);
          setChatData(extractedChatData);
          
          // Set active user to the first contact if not set
          if (extractedContacts.length > 0 && !activeUserId) {
            setActiveUserId(extractedContacts[0].id);
            setActiveChatId(extractedContacts[0].chatId);
            
            // Join room with this user
            socketService.joinRoom(currentUser._id, extractedContacts[0].id);
            
            // Mark messages as read for initial active chat
            chatAPI.markAsRead(extractedContacts[0].chatId, currentUser._id).catch(err => {
              console.error('Error marking messages as read:', err);
            });
          }
        })
        .catch(error => {
          console.error('Error fetching chats:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isAuthenticated, currentUser]);

  // Join room when active user changes
  useEffect(() => {
    if (currentUser?._id && activeUserId) {
      socketService.joinRoom(currentUser._id, activeUserId);
    }
  }, [currentUser, activeUserId]);

  const handleUserSelect = (userId, chatId) => {
    setActiveUserId(userId);
    setActiveChatId(chatId);
    
    // Mark messages as read when selecting a user
    if (chatId) {
      chatAPI.markAsRead(chatId, currentUser._id).catch(err => {
        console.error('Error marking messages as read:', err);
      });
      
      // Update unread count in contacts
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === userId ? { ...contact, unread: 0 } : contact
        )
      );
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeUserId || !activeChatId) return;

    try {
      // Format message data for API
      const messageData = {
        senderId: currentUser._id,
        senderModel: 'admin',
        receiverId: activeUserId,
        receiverModel: 'user',
        content: newMessage.trim()
      };

      // Update local chat data immediately for better UX
      const newMsg = {
        sender: 'Support',
        text: newMessage.trim(),
        timestamp: new Date()
      };
      
      setChatData(prevChatData => {
        const prevMessages = prevChatData[activeUserId] || [];
        return {
          ...prevChatData,
          [activeUserId]: [...prevMessages, newMsg]
        };
      });
      
      // Clear input
      setNewMessage('');

      // Send message via API
      await chatAPI.sendMessage(activeChatId, messageData);
      
      // Also send via socket for real-time
      socketService.sendMessage(currentUser._id, activeUserId, newMessage.trim());
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Format time for display
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Redirect to login if not authenticated or not an admin
  if (!isAuthenticated || userType !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-6">
      <h2 className="text-2xl font-bold mb-4">Support Chat</h2>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No active conversations found.</p>
        </div>
      ) : (
        <div className="support-chat-layout">
          <div className="support-chat-contacts">
            <h3>Contacts</h3>
            <ul>
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  onClick={() => handleUserSelect(contact.id, contact.chatId)}
                  className={contact.id === activeUserId ? 'active' : ''}
                >
                  {contact.name}
                  {contact.unread > 0 && (
                    <span className="unread-badge">{contact.unread}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="support-chat-container">
            {activeUserId ? (
              <>
                <h2 className="support-chat-header">
                  Chat with {contacts.find(c => c.id === activeUserId)?.name}
                </h2>
                <div className="support-chat-box">
                  {(chatData[activeUserId] || []).length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <p>No messages yet</p>
                    </div>
                  ) : (
                    (chatData[activeUserId] || []).map((msg, index) => (
                      <div
                        key={index}
                        className={`support-chat-message ${msg.sender === 'Support' ? 'support' : 'user'}`}
                      >
                        <div className="message-content">{msg.text}</div>
                        <div className="message-meta">
                          <span className="message-time">{formatTime(msg.timestamp)}</span>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="support-chat-input-area">
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChatPage; 