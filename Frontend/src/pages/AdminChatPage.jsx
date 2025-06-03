import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import { chatAPI } from '../services/chat.service';
import socketService from '../services/socket.service';
import { Navigate } from 'react-router-dom';

const AdminChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const { currentUser, isAuthenticated, userType } = useAuth();

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
    if (currentUser?._id) {
      socketService.connect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [currentUser]);

  // Update UI when switching between list and chat on mobile
  useEffect(() => {
    if (mobileView) {
      setShowChatList(!selectedChat);
    } else {
      setShowChatList(true);
    }
  }, [mobileView, selectedChat]);

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

  // Redirect to login if not authenticated or not an admin
  if (!isAuthenticated || userType !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="container-custom py-6">
      <h1 className="text-2xl font-bold mb-4">Customer Support</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex h-[700px]">
          {/* Chat List */}
          {showChatList && (
            <motion.div 
              className={`${mobileView ? 'w-full' : 'w-1/3 border-r'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="font-medium">All Conversations</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Respond to customer inquiries
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <ChatList onSelectChat={handleSelectChat} />
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Chat Window */}
          {(!mobileView || !showChatList) && (
            <motion.div 
              className={`${mobileView ? 'w-full' : 'w-2/3'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ChatWindow chat={selectedChat} onBack={handleBack} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage; 