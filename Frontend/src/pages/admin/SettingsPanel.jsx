import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StorageIcon from '@mui/icons-material/Storage';
import BackupIcon from '@mui/icons-material/Backup';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // User Profile State
  const [profile, setProfile] = useState({
    fullName: 'Admin User',
    email: 'admin@smartbuild.com',
    phone: '+94 77 123 4567',
    role: 'Administrator',
    bio: 'System administrator for SmartBuild Market platform.',
    avatar: null
  });
  
  // Security Settings State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    inventoryAlerts: true,
    marketingEmails: false,
    systemAlerts: true
  });
  
  // System Settings State
  const [system, setSystem] = useState({
    language: 'english',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    autoBackup: true,
    backupFrequency: 'daily',
    maintenanceMode: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        avatar: URL.createObjectURL(file)
      });
    }
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity({
      ...security,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };

  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystem({
      ...system,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(`${type} settings updated successfully!`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const renderProfileSettings = () => (
    <form onSubmit={(e) => handleSubmit(e, 'Profile')} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <PersonIcon style={{ fontSize: 64 }} className="text-gray-400" />
              )}
            </div>
            
            <label className="admin-btn admin-btn-secondary cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
              Change Photo
            </label>
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={profile.role}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="bio" className="block mb-1 font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="admin-btn admin-btn-primary flex items-center space-x-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <SaveIcon fontSize="small" />
              <span>Save Profile</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderSecuritySettings = () => (
    <form onSubmit={(e) => handleSubmit(e, 'Security')} className="space-y-6">
      <div className="max-w-lg space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block mb-1 font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={security.currentPassword}
            onChange={handleSecurityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="newPassword" className="block mb-1 font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={security.newPassword}
            onChange={handleSecurityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={security.confirmPassword}
            onChange={handleSecurityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="admin-btn admin-btn-primary flex items-center space-x-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <SaveIcon fontSize="small" />
              <span>Update Password</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderNotificationSettings = () => (
    <form onSubmit={(e) => handleSubmit(e, 'Notification')} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="font-medium text-gray-800">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="emailNotifications"
              className="sr-only peer" 
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="font-medium text-gray-800">Order Updates</h3>
            <p className="text-sm text-gray-500">Notifications for new orders and status changes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="orderUpdates"
              className="sr-only peer" 
              checked={notifications.orderUpdates}
              onChange={handleNotificationChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="font-medium text-gray-800">Inventory Alerts</h3>
            <p className="text-sm text-gray-500">Get notified when inventory is low or out of stock</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="inventoryAlerts"
              className="sr-only peer" 
              checked={notifications.inventoryAlerts}
              onChange={handleNotificationChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="font-medium text-gray-800">Marketing Emails</h3>
            <p className="text-sm text-gray-500">Receive promotional emails and special offers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="marketingEmails"
              className="sr-only peer" 
              checked={notifications.marketingEmails}
              onChange={handleNotificationChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="font-medium text-gray-800">System Alerts</h3>
            <p className="text-sm text-gray-500">Important system notifications and updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="systemAlerts"
              className="sr-only peer" 
              checked={notifications.systemAlerts}
              onChange={handleNotificationChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="admin-btn admin-btn-primary flex items-center space-x-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <SaveIcon fontSize="small" />
              <span>Save Preferences</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderSystemSettings = () => (
    <form onSubmit={(e) => handleSubmit(e, 'System')} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block mb-1 font-medium text-gray-700">Language</label>
            <select
              id="language"
              name="language"
              value={system.language}
              onChange={handleSystemChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="english">English</option>
              <option value="sinhala">Sinhala</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateFormat" className="block mb-1 font-medium text-gray-700">Date Format</label>
            <select
              id="dateFormat"
              name="dateFormat"
              value={system.dateFormat}
              onChange={handleSystemChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="theme" className="block mb-1 font-medium text-gray-700">Theme</label>
            <select
              id="theme"
              name="theme"
              value={system.theme}
              onChange={handleSystemChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 mt-8">
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              checked={system.maintenanceMode}
              onChange={handleSystemChange}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="maintenanceMode" className="font-medium text-gray-700">
              Enable Maintenance Mode
            </label>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium text-gray-800 mb-4">Backup Settings</h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="autoBackup"
              name="autoBackup"
              checked={system.autoBackup}
              onChange={handleSystemChange}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="autoBackup" className="font-medium text-gray-700">
              Enable Automatic Backups
            </label>
          </div>
          
          {system.autoBackup && (
            <div>
              <label htmlFor="backupFrequency" className="block mb-1 font-medium text-gray-700">Backup Frequency</label>
              <select
                id="backupFrequency"
                name="backupFrequency"
                value={system.backupFrequency}
                onChange={handleSystemChange}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
          
          <div className="mt-4">
            <button 
              type="button" 
              className="admin-btn admin-btn-secondary flex items-center space-x-1"
            >
              <BackupIcon fontSize="small" />
              <span>Create Manual Backup</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="admin-btn admin-btn-primary flex items-center space-x-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <SaveIcon fontSize="small" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and system settings</p>
        </div>
        
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        <div className="flex border-b overflow-x-auto mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center space-x-1 border-b-2 ${
              activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <PersonIcon fontSize="small" />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center space-x-1 border-b-2 ${
              activeTab === 'security'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <SecurityIcon fontSize="small" />
            <span>Security</span>
          </button>
          
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center space-x-1 border-b-2 ${
              activeTab === 'notifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <NotificationsIcon fontSize="small" />
            <span>Notifications</span>
          </button>
          
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center space-x-1 border-b-2 ${
              activeTab === 'system'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <StorageIcon fontSize="small" />
            <span>System</span>
          </button>
        </div>
        
        <div>
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'system' && renderSystemSettings()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 