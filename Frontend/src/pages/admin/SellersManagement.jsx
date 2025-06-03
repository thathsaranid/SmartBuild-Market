import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Box,
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { adminAPI } from '../../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sellers-tabpanel-${index}`}
      aria-labelledby={`sellers-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const SellersManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  useEffect(() => {
    fetchSellers();
  }, []);
  
  useEffect(() => {
    filterSellers();
  }, [sellers, searchTerm, tabValue]);
  
  const fetchSellers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getSellers();
      setSellers(data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
      toast.error('Failed to load sellers. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const filterSellers = () => {
    let filtered = [...sellers];
    
    // Apply status filter based on tab
    if (tabValue === 1) {
      filtered = filtered.filter(seller => seller.status === 'pending');
    } else if (tabValue === 2) {
      filtered = filtered.filter(seller => seller.status === 'approved');
    } else if (tabValue === 3) {
      filtered = filtered.filter(seller => seller.status === 'rejected');
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        seller =>
          seller.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seller.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seller.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSellers(filtered);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };
  
  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
    setOpenViewDialog(true);
  };
  
  const handleApproveDialogOpen = (seller) => {
    setSelectedSeller(seller);
    setOpenApproveDialog(true);
  };
  
  const handleRejectDialogOpen = (seller) => {
    setSelectedSeller(seller);
    setOpenRejectDialog(true);
  };
  
  const handleApprove = async () => {
    try {
      setLoading(true);
      await adminAPI.approveSeller(selectedSeller._id);
      
      // Update seller status in the local state
      const updatedSellers = sellers.map(seller =>
        seller._id === selectedSeller._id
          ? { ...seller, status: 'approved' }
          : seller
      );
      
      setSellers(updatedSellers);
      setOpenApproveDialog(false);
      toast.success(`${selectedSeller.companyName} has been approved`);
    } catch (error) {
      console.error('Error approving seller:', error);
      toast.error('Failed to approve seller. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReject = async () => {
    try {
      setLoading(true);
      await adminAPI.rejectSeller(selectedSeller._id);
      
      // Update seller status in the local state
      const updatedSellers = sellers.map(seller =>
        seller._id === selectedSeller._id
          ? { ...seller, status: 'rejected' }
          : seller
      );
      
      setSellers(updatedSellers);
      setOpenRejectDialog(false);
      toast.success(`${selectedSeller.companyName} has been rejected`);
    } catch (error) {
      console.error('Error rejecting seller:', error);
      toast.error('Failed to reject seller. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusChip = (status) => {
    switch (status) {
      case 'approved':
        return <Chip label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip label="Rejected" color="error" size="small" />;
      case 'pending':
        return <Chip label="Pending" color="warning" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (loading && sellers.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <CircularProgress />
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5" component="h1" className="font-bold">
          Seller Management
        </Typography>
        
        <TextField
          placeholder="Search sellers..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      
      <Paper elevation={0} variant="outlined">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Sellers" />
          <Tab label="Pending" />
          <Tab label="Approved" />
          <Tab label="Rejected" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <SellerTable
            sellers={filteredSellers}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleViewSeller={handleViewSeller}
            handleApproveDialogOpen={handleApproveDialogOpen}
            handleRejectDialogOpen={handleRejectDialogOpen}
            getStatusChip={getStatusChip}
            formatDate={formatDate}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <SellerTable
            sellers={filteredSellers}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleViewSeller={handleViewSeller}
            handleApproveDialogOpen={handleApproveDialogOpen}
            handleRejectDialogOpen={handleRejectDialogOpen}
            getStatusChip={getStatusChip}
            formatDate={formatDate}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <SellerTable
            sellers={filteredSellers}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleViewSeller={handleViewSeller}
            handleApproveDialogOpen={handleApproveDialogOpen}
            handleRejectDialogOpen={handleRejectDialogOpen}
            getStatusChip={getStatusChip}
            formatDate={formatDate}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <SellerTable
            sellers={filteredSellers}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleViewSeller={handleViewSeller}
            handleApproveDialogOpen={handleApproveDialogOpen}
            handleRejectDialogOpen={handleRejectDialogOpen}
            getStatusChip={getStatusChip}
            formatDate={formatDate}
          />
        </TabPanel>
      </Paper>
      
      {/* View Seller Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedSeller && (
          <>
            <DialogTitle>
              <div className="flex justify-between items-center">
                <Typography variant="h6">Seller Details</Typography>
                <div>
                  {getStatusChip(selectedSeller.status)}
                </div>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography variant="subtitle2" color="textSecondary">
                    Company Name
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.companyName}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    Company Type
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.companyType || 'Not specified'}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    Business Address
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.businessAddress || 'Not specified'}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    Registration Number
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.registrationNumber || 'Not specified'}
                  </Typography>
                </div>
                
                <div>
                  <Typography variant="subtitle2" color="textSecondary">
                    Contact Person
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.firstName} {selectedSeller.lastName}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.email}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {selectedSeller.phone || 'Not specified'}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    Registered On
                  </Typography>
                  <Typography variant="body1" className="font-medium mb-3">
                    {formatDate(selectedSeller.createdAt)}
                  </Typography>
                </div>
              </div>
              
              {selectedSeller.description && (
                <div className="mt-3">
                  <Typography variant="subtitle2" color="textSecondary">
                    Company Description
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {selectedSeller.description}
                  </Typography>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)}>
                Close
              </Button>
              
              {selectedSeller.status === 'pending' && (
                <>
                  <Button
                    onClick={() => {
                      setOpenViewDialog(false);
                      handleApproveDialogOpen(selectedSeller);
                    }}
                    color="primary"
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                  >
                    Approve
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setOpenViewDialog(false);
                      handleRejectDialogOpen(selectedSeller);
                    }}
                    color="error"
                    variant="contained"
                    startIcon={<CancelIcon />}
                  >
                    Reject
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Approve Confirmation Dialog */}
      <Dialog
        open={openApproveDialog}
        onClose={() => setOpenApproveDialog(false)}
      >
        <DialogTitle>Approve Seller</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve {selectedSeller?.companyName}? This will give them access to sell products on the platform.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApproveDialog(false)}>Cancel</Button>
          <Button
            onClick={handleApprove}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Approve'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Reject Confirmation Dialog */}
      <Dialog
        open={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
      >
        <DialogTitle>Reject Seller</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject {selectedSeller?.companyName}? They will not be able to sell products on the platform.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)}>Cancel</Button>
          <Button
            onClick={handleReject}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Separate component for the table to avoid repetition
const SellerTable = ({
  sellers,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleViewSeller,
  handleApproveDialogOpen,
  handleRejectDialogOpen,
  getStatusChip,
  formatDate
}) => {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sellers.length) : 0;
  
  return (
    <>
      {sellers.length === 0 ? (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            No sellers found
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Registered On</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? sellers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : sellers
              ).map((seller) => (
                <TableRow
                  key={seller._id}
                  hover
                  className="cursor-pointer"
                >
                  <TableCell component="th" scope="row" onClick={() => handleViewSeller(seller)}>
                    {seller.companyName}
                  </TableCell>
                  <TableCell onClick={() => handleViewSeller(seller)}>
                    {seller.firstName} {seller.lastName}
                  </TableCell>
                  <TableCell onClick={() => handleViewSeller(seller)}>
                    {seller.email}
                  </TableCell>
                  <TableCell onClick={() => handleViewSeller(seller)}>
                    {formatDate(seller.createdAt)}
                  </TableCell>
                  <TableCell onClick={() => handleViewSeller(seller)}>
                    {getStatusChip(seller.status)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center space-x-1">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewSeller(seller)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      {seller.status === 'pending' && (
                        <>
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleApproveDialogOpen(seller)}
                            >
                              <CheckCircleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Reject">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRejectDialogOpen(seller)}
                            >
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sellers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
};

export default SellersManagement; 