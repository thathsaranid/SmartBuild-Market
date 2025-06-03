import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import { chatAPI } from '../services/chat.service';
import socketService from '../services/socket.service';
import { Navigate, useLocation } from 'react-router-dom';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [isStartingChat, setIsStartingChat] = useState(false);
  const { currentUser, currentWorker, userType, isAuthenticated } = useAuth();
  const location = useLocation();

  const userId = userType === 'user' ? currentUser?._id : currentWorker?._id;

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Connect to socket.io when component mounts
  useEffect(() => {
    if (userId) {
      socketService.connect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [userId]);

  // Update UI when switching between list and chat on mobile
  useEffect(() => {
    if (mobileView) {
      setShowChatList(!selectedChat);
    } else {
      setShowChatList(true);
    }
  }, [mobileView, selectedChat]);

  // Check if we need to start admin chat (from consultation page)
  useEffect(() => {
    const startConsultationChat = async () => {
      // Check if we came from the consultation page
      const fromConsultation = location.state?.fromConsultation;
      
      if (fromConsultation && userId && !selectedChat) {
        setIsStartingChat(true);
        try {
          await handleStartAdminChat();
        } catch (error) {
          console.error('Error starting consultation chat:', error);
        } finally {
          setIsStartingChat(false);
        }
      }
    };
    
    startConsultationChat();
  }, [userId, location.state, selectedChat]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    
    // On mobile, hide the chat list when a chat is selected
    if (mobileView) {
      setShowChatList(false);
    }
  };

  const handleBack = () => {
    setSelectedChat(null);
    setShowChatList(true);
  };

  // Start a new chat with admin
  const handleStartAdminChat = async () => {
    try {
      // First try to find an existing chat with admin
      const adminUserId = 'admin123'; // Default admin ID
      const response = await chatAPI.getChatWithUser(userId, userType, adminUserId, 'admin');
      
      // Set as selected chat
      setSelectedChat(response.data);
      
      if (mobileView) {
        setShowChatList(false);
      }
      
      return response;
    } catch (error) {
      console.error('Error starting admin chat:', error);
      throw error;
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/chat' }} />;
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex h-[600px]">
          {/* Chat List */}
          {showChatList && (
            <div className={`${mobileView ? 'w-full' : 'w-1/3 border-r'}`}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-medium">Conversations</h2>
                  <button 
                    onClick={handleStartAdminChat}
                    className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition-colors"
                    disabled={isStartingChat}
                  >
                    {isStartingChat ? 'Connecting...' : 'Contact Support'}
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <ChatList onSelectChat={handleSelectChat} />
                </div>
              </div>
            </div>
          )}
          
          {/* Chat Window */}
          {(!mobileView || !showChatList) && (
            <div className={`${mobileView ? 'w-full' : 'w-2/3'}`}>
              <ChatWindow chat={selectedChat} onBack={handleBack} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 