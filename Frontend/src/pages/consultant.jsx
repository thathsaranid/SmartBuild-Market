import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Typography, 
  Button, 
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Consultant = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleChatWithAdmin = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    
    // Navigate directly to the chat page with the fromConsultation state
    navigate('/chat', { state: { fromConsultation: true } });
  };

  const handleLoginRedirect = () => {
    setLoginDialogOpen(false);
    navigate('/login', { state: { from: '/consultant' } });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container-custom py-12">
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBackToHome}
        className="mb-6"
      >
        Back to Home
      </Button>
      
      <Typography variant="h4" component="h1" className="mb-6 font-bold text-gray-800">
        Construction Consultation
      </Typography>
      
      <Paper elevation={2} className="p-8 rounded-lg mb-8">
        <Box className="text-center mb-8">
          <SupportAgentIcon style={{ fontSize: 80 }} className="text-primary mb-4" />
          <Typography variant="h5" className="mb-4">
            Expert Construction Support
          </Typography>
          <Typography variant="body1" className="mb-6 max-w-2xl mx-auto text-gray-600">
            Our team of construction experts is ready to assist you with your project questions,
            technical challenges, and professional advice on planning, materials, and execution.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ChatIcon />}
            onClick={handleChatWithAdmin}
            className="px-6 py-3"
          >
            Chat with Support Team
          </Button>
        </Box>
        
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Paper elevation={1} className="p-6 text-center">
            <Typography variant="h6" className="mb-3 font-semibold">Technical Guidance</Typography>
            <Typography variant="body2" className="text-gray-600">
              Get expert advice on construction techniques, material selection, and structural solutions.
            </Typography>
          </Paper>
          
          <Paper elevation={1} className="p-6 text-center">
            <Typography variant="h6" className="mb-3 font-semibold">Project Planning</Typography>
            <Typography variant="body2" className="text-gray-600">
              Receive assistance with project timelines, budgeting, and resource allocation.
            </Typography>
          </Paper>
          
          <Paper elevation={1} className="p-6 text-center">
            <Typography variant="h6" className="mb-3 font-semibold">Problem Solving</Typography>
            <Typography variant="body2" className="text-gray-600">
              Our experts can help troubleshoot construction issues and provide effective solutions.
            </Typography>
          </Paper>
        </Box>
      </Paper>
      
      {/* How It Works Section */}
      <Typography variant="h5" className="mb-6 font-semibold">
        How It Works
      </Typography>
      
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Box className="text-center">
          <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">1</div>
          <Typography variant="h6" className="mb-2">Start a Chat</Typography>
          <Typography variant="body2" className="text-gray-600">
            Click the button above to connect with our construction support team.
          </Typography>
        </Box>
        
        <Box className="text-center">
          <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">2</div>
          <Typography variant="h6" className="mb-2">Explain Your Needs</Typography>
          <Typography variant="body2" className="text-gray-600">
            Describe your project and the specific challenges or questions you have.
          </Typography>
        </Box>
        
        <Box className="text-center">
          <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">3</div>
          <Typography variant="h6" className="mb-2">Get Expert Advice</Typography>
          <Typography variant="body2" className="text-gray-600">
            Receive personalized guidance and solutions from our construction professionals.
          </Typography>
        </Box>
      </Box>
      
      {/* Login Dialog */}
      <Dialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to be logged in to use the chat consultation service. Would you like to login now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect} color="primary" variant="contained" autoFocus>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Consultant; 