import React, { useState, useEffect } from 'react';
import chatService from '../services/chat.service';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load all users who have sent messages
    const allUsers = chatService.getAllUsers();
    setUsers(allUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const userMessages = chatService.getUserMessages(selectedUser.userId);
      setMessages(userMessages);
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    const newMessage = chatService.addMessage(
      selectedUser.userId,
      'Admin',
      message
    );
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4">
        {/* User List */}
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="space-y-2">
            {users.map(user => (
              <button
                key={user.userId}
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left p-2 rounded ${
                  selectedUser?.userId === user.userId
                    ? 'bg-blue-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                {user.userName}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-3 bg-white rounded-lg shadow-lg p-4">
          {selectedUser ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Chat with {selectedUser.userName}
              </h2>
              
              <div className="h-96 overflow-y-auto mb-4 border rounded p-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <div className="font-semibold">{msg.userName}</div>
                    <div className="bg-gray-100 rounded p-2">{msg.message}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 