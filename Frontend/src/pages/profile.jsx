import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Typography, 
  Button, 
  Paper, 
  Tabs, 
  Tab, 
  Box, 
  TextField, 
  Grid, 
  Divider,
  Avatar,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import HistoryIcon from '@mui/icons-material/History';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { userAPI } from '../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Mock order history
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2023-05-15',
      status: 'Delivered',
      total: 12500,
      items: [
        { name: 'Steel Rods', quantity: 10, price: 1000 },
        { name: 'Cement Bags', quantity: 5, price: 500 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2023-06-02',
      status: 'Processing',
      total: 8000,
      items: [
        { name: 'Plumbing Pipes', quantity: 20, price: 400 }
      ]
    }
  ]);
  
  // Mock saved items
  const [savedItems, setSavedItems] = useState([
    {
      id: 'ITEM-001',
      name: 'Excavator XL2000',
      type: 'Machine',
      image: '/images/product-placeholder.png',
      price: 250000
    },
    {
      id: 'ITEM-002',
      name: 'Cement Bags',
      type: 'Material',
      image: '/images/product-placeholder.png',
      price: 1200
    }
  ]);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        const token = localStorage.getItem('userToken');
        if (!token) {
          // Redirect to login page if not logged in
          toast.info('Please log in to view your profile');
          navigate('/login');
          return;
        }
        
        // Get user profile data
        const profile = await userAPI.getProfile();
        
        if (profile) {
          // Update user data with profile information
          setUserData({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            email: profile.email || '',
            phone: profile.phone || '',
            address: profile.address || '',
            city: profile.city || '',
            province: profile.province || '',
            postalCode: profile.postalCode || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset edit mode when changing tabs
    setEditMode(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!userData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!userData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (userData.phone && !/^\d{9,10}$/.test(userData.phone.replace(/[^\d]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleUpdateProfile = async () => {
    if (!validateProfileForm()) return;
    
    try {
      setLoading(true);
      
      // Update profile
      await userAPI.updateProfile(userData);
      
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdatePassword = async () => {
    if (!validatePasswordForm()) return;
    
    try {
      setLoading(true);
      
      // Update password
      await userAPI.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      toast.success('Password changed successfully');
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await userAPI.logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  const removeSavedItem = (itemId) => {
    // Mock removal of saved item
    setSavedItems(savedItems.filter(item => item.id !== itemId));
    toast.success('Item removed from saved items');
  };
  
  if (loading && userData.email === '') {
    return (
      <div className="container-custom py-12 min-h-[60vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper elevation={1} className="p-6 text-center">
            <div className="mb-4 relative inline-block">
              <Avatar
                src={userData.avatar || null}
                alt={`${userData.firstName} ${userData.lastName}`}
                sx={{ width: 120, height: 120, mx: 'auto' }}
                className="border-4 border-gray-100"
              >
                {userData.firstName && userData.lastName 
                  ? userData.firstName.charAt(0) + userData.lastName.charAt(0) 
                  : <PersonIcon fontSize="large" />}
              </Avatar>
              
              <IconButton
                className="absolute bottom-0 right-0 bg-primary text-white hover:bg-primary-dark"
                size="small"
                component="label"
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    // In a real app, we would upload the image to the server
                    toast.info('Profile picture upload is not implemented in this demo');
                  }}
                />
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </div>
            
            <Typography variant="h5" className="font-bold">
              {userData.firstName} {userData.lastName}
            </Typography>
            
            <Typography variant="body2" color="textSecondary" className="mb-6">
              {userData.email}
            </Typography>
            
            <Divider className="mb-4" />
            
            <List component="nav">
              <ListItem 
                button 
                selected={tabValue === 0}
                onClick={() => setTabValue(0)}
                className="rounded"
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
              </ListItem>
              
              <ListItem 
                button 
                selected={tabValue === 1}
                onClick={() => setTabValue(1)}
                className="rounded"
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              
              <ListItem 
                button 
                selected={tabValue === 2}
                onClick={() => setTabValue(2)}
                className="rounded"
              >
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Order History" />
              </ListItem>
              
              <ListItem 
                button 
                selected={tabValue === 3}
                onClick={() => setTabValue(3)}
                className="rounded"
              >
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Items" />
              </ListItem>
              
              <ListItem 
                button 
                onClick={handleLogout}
                className="rounded text-red-600"
              >
                <ListItemIcon className="text-red-600">
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8} lg={9}>
          <Paper elevation={1} className="p-6">
            <TabPanel value={tabValue} index={0}>
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h5" component="h1" className="font-bold">
                  Personal Information
                </Typography>
                
                {!editMode && (
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="primary"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
              
              {editMode ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        error={!!errors.address}
                        helperText={errors.address}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                        error={!!errors.city}
                        helperText={errors.city}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Province"
                        name="province"
                        value={userData.province}
                        onChange={handleInputChange}
                        error={!!errors.province}
                        helperText={errors.province}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        name="postalCode"
                        value={userData.postalCode}
                        onChange={handleInputChange}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                      />
                    </Grid>
                  </Grid>
                  
                  <div className="flex justify-end mt-6 space-x-2">
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateProfile}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Full Name
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {userData.firstName} {userData.lastName}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {userData.email}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Phone
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {userData.phone || 'Not specified'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Address
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {userData.address ? (
                          <>
                            {userData.address}, {userData.city}, {userData.province} {userData.postalCode}
                          </>
                        ) : (
                          'Not specified'
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </motion.div>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <div className="mb-6">
                <Typography variant="h5" component="h1" className="font-bold mb-6">
                  Security
                </Typography>
                
                <Typography variant="h6" className="mb-4">
                  Change Password
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={!!errors.currentPassword}
                      helperText={errors.currentPassword}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    />
                  </Grid>
                </Grid>
                
                <div className="flex justify-end mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePassword}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h5" component="h1" className="font-bold mb-6">
                Order History
              </Typography>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} variant="outlined" className="overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                        <div>
                          <Typography variant="subtitle1" className="font-semibold">
                            Order #{order.id}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(order.date).toLocaleDateString()}
                          </Typography>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </div>
                          
                          <Button 
                            size="small" 
                            className="ml-3"
                            onClick={() => toast.info('Order details feature coming soon')}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <Typography variant="body2">
                                {item.quantity} x {item.name}
                              </Typography>
                              <Typography variant="body2" className="font-medium">
                                LKR {(item.price * item.quantity).toLocaleString()}
                              </Typography>
                            </div>
                          ))}
                        </div>
                        
                        <Divider className="my-3" />
                        
                        <div className="flex justify-between">
                          <Typography variant="subtitle2">Total</Typography>
                          <Typography variant="subtitle1" className="font-bold">
                            LKR {order.total.toLocaleString()}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBagIcon style={{ fontSize: 60 }} className="text-gray-300 mb-4" />
                  <Typography variant="h6" color="textSecondary">
                    No orders yet
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-4">
                    When you place orders, they will appear here.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/material')}
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h5" component="h1" className="font-bold mb-6">
                Saved Items
              </Typography>
              
              {savedItems.length > 0 ? (
                <Grid container spacing={3}>
                  {savedItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card variant="outlined">
                        <div className="h-48 bg-gray-100 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-4"
                          />
                          <IconButton
                            className="absolute top-2 right-2 bg-white shadow-sm hover:bg-gray-100"
                            size="small"
                            onClick={() => removeSavedItem(item.id)}
                          >
                            <BookmarkIcon color="primary" fontSize="small" />
                          </IconButton>
                        </div>
                        
                        <CardContent>
                          <Typography variant="subtitle1" className="font-semibold">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" className="mb-2">
                            {item.type}
                          </Typography>
                          <Typography variant="subtitle1" className="font-bold">
                            LKR {item.price.toLocaleString()}
                          </Typography>
                          
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="mt-3"
                            onClick={() => {
                              toast.success(`${item.name} added to cart`);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div className="text-center py-8">
                  <BookmarkIcon style={{ fontSize: 60 }} className="text-gray-300 mb-4" />
                  <Typography variant="h6" color="textSecondary">
                    No saved items
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-4">
                    Save items that you're interested in to view them later.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/material')}
                  >
                    Browse Products
                  </Button>
                </div>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile; 