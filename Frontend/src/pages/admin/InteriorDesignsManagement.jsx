import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { designAPI } from '../../services/api';

const InteriorDesignsManagement = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDesign, setCurrentDesign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    mainImage: null,
    additionalImages: []
  });
  const [previewUrls, setPreviewUrls] = useState({
    mainImage: '',
    additionalImages: []
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const categories = [
    'historic-formal', 
    'casual', 
    'relaxed', 
    'traditional', 
    'farmhouse', 
    'sophisticated'
  ];

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const response = await designAPI.getAllDesigns();
      if (response.success) {
        setDesigns(response.data);
      } else {
        setError('Failed to fetch designs');
      }
    } catch (err) {
      console.error('Error fetching designs:', err);
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = (design = null) => {
    if (design) {
      setIsEditing(true);
      setCurrentDesign(design);
      setFormData({
        name: design.name,
        description: design.description,
        category: design.category,
        price: design.price,
        discountPrice: design.discountPrice || '',
        mainImage: null,
        additionalImages: []
      });
      setPreviewUrls({
        mainImage: `http://localhost:3001${design.mainImage}`,
        additionalImages: design.images ? design.images.map(img => `http://localhost:3001${img}`) : []
      });
    } else {
      setIsEditing(false);
      setCurrentDesign(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        discountPrice: '',
        mainImage: null,
        additionalImages: []
      });
      setPreviewUrls({
        mainImage: '',
        additionalImages: []
      });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.category || !formData.price) {
      toast.error('Please fill all required fields');
      return false;
    }

    if (!isEditing && !formData.mainImage) {
      toast.error('Please upload a main image');
      return false;
    }

    // Validate discount price
    if (formData.discountPrice && parseFloat(formData.discountPrice) >= parseFloat(formData.price)) {
      toast.error('Discount price must be less than regular price');
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validate discount price on change
    if (name === 'discountPrice' && value) {
      const price = parseFloat(formData.price);
      const discountPrice = parseFloat(value);
      
      if (discountPrice >= price) {
        toast.error('Discount price must be less than regular price');
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'mainImage') {
      if (files[0]) {
        setFormData(prev => ({
          ...prev,
          mainImage: files[0]
        }));
        setPreviewUrls(prev => ({
          ...prev,
          mainImage: URL.createObjectURL(files[0])
        }));
      }
    } else if (name === 'additionalImages') {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        additionalImages: [...(prev.additionalImages || []), ...newFiles]
      }));
      
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...newPreviewUrls]
      }));
    }
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
    
    setPreviewUrls(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formDataToSubmit = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        description: formData.description,
      };

      if (isEditing) {
        await designAPI.updateDesign(
          currentDesign._id,
          formDataToSubmit,
          formData.mainImage,
          formData.additionalImages
        );
        toast.success('Design updated successfully!');
      } else {
        await designAPI.addDesign(
          formDataToSubmit,
          formData.mainImage,
          formData.additionalImages
        );
        toast.success('Design added successfully!');
      }
      
      handleDialogClose();
      fetchDesigns();
    } catch (error) {
      console.error('Error submitting design:', error);
      const errorMessage = error.message || 'Failed to submit design';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDesign = async (id) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        setLoading(true);
        const response = await designAPI.deleteDesign(id);
        
        if (response.success) {
          toast.success('Design deleted successfully');
          fetchDesigns();
        } else {
          toast.error(response.message || 'Failed to delete design');
        }
      } catch (err) {
        console.error('Error deleting design:', err);
        toast.error(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Interior Designs Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Add New Design
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button 
            size="small" 
            onClick={fetchDesigns} 
            sx={{ ml: 2 }}
          >
            Try Again
          </Button>
        </Alert>
      )}
      
      {loading && !openDialog ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : designs.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            No interior designs found. Add your first design to get started.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price (LKR)</TableCell>
                <TableCell>Discount Price (LKR)</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designs.map((design) => (
                <TableRow key={design._id}>
                  <TableCell>
                    <img 
                      src={`http://localhost:3001${design.mainImage}`} 
                      alt={design.name} 
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>{design.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={design.category} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{design.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {design.discountPrice ? design.discountPrice.toFixed(2) : '-'}
                  </TableCell>
                  <TableCell>{design.rating || 0}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleDialogOpen(design)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteDesign(design._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {/* Add/Edit Design Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Edit Interior Design' : 'Add New Interior Design'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price (LKR)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Discount Price (LKR)"
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Main Image (Required)
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  name="mainImage"
                  onChange={handleFileChange}
                  required={!isEditing}
                  style={{ marginBottom: 16 }}
                />
                {previewUrls.mainImage && (
                  <Box sx={{ mt: 2 }}>
                    <img 
                      src={previewUrls.mainImage} 
                      alt="Main preview" 
                      style={{ width: 200, height: 200, objectFit: 'cover' }} 
                    />
                  </Box>
                )}
              </Grid>
              <Grid xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Additional Images (Optional)
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  name="additionalImages"
                  onChange={handleFileChange}
                  multiple
                  style={{ marginBottom: 16 }}
                />
                {previewUrls.additionalImages.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {previewUrls.additionalImages.map((url, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <img 
                          src={url} 
                          alt={`Preview ${index}`} 
                          style={{ width: 80, height: 80, objectFit: 'cover' }} 
                        />
                        <IconButton 
                          size="small" 
                          sx={{ 
                            position: 'absolute', 
                            top: -10, 
                            right: -10, 
                            bgcolor: 'rgba(255,255,255,0.8)' 
                          }}
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InteriorDesignsManagement; 