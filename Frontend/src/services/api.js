// API service for communicating with the backend
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

// Machines - Updated to use real data
export const machineAPI = {
  getAllMachines: async () => {
    try {
      const response = await api.get('/machine/machines');
      return response;
    } catch (error) {
      console.error('Error fetching machines:', error);
      throw error;
    }
  },
  
  getMachineById: async (id) => {
    try {
      const response = await api.get(`/machine/machine/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching machine:', error);
      throw error;
    }
  },
  
  addMachine: async (machineData, image) => {
    try {
      const formData = new FormData();
      
      // Add all machine data to form
      Object.keys(machineData).forEach(key => {
        if (machineData[key] !== undefined && machineData[key] !== null) {
          formData.append(key, machineData[key]);
        }
      });
      
      // Add image if available
      if (image) {
        formData.append('image', image);
      }
      
      const response = await api.post('/machine/addmachine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    } catch (error) {
      console.error('Error adding machine:', error);
      throw error;
    }
  },
  
  updateMachine: async (id, machineData, image) => {
    try {
      const formData = new FormData();
      
      // Add all machine data to form
      Object.keys(machineData).forEach(key => {
        if (machineData[key] !== undefined && machineData[key] !== null) {
          formData.append(key, machineData[key]);
        }
      });
      
      // Add image if available
      if (image) {
        formData.append('image', image);
      }
      
      const response = await api.put(`/machine/updatemachine/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    } catch (error) {
      console.error('Error updating machine:', error);
      throw error;
    }
  },
  
  deleteMachine: async (id) => {
    try {
      const response = await api.delete(`/machine/deletemachine/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting machine:', error);
      throw error;
    }
  }
};

// User authentication
export const userAPI = {
  register: (userData) => 
    api.post('/user/register', userData),
  
  login: (email, password, type) => 
    api.post('/user/login', { email, password, type }),
  
  getProfile: () => 
    api.get('/user/getuser'),
  
  updateProfile: (data) => 
    api.put('/user/profile', data),
  
  changePassword: (currentPassword, newPassword) => 
    api.post('/user/change-password', { currentPassword, newPassword }),
};

// Seller specific APIs - Updated to use real data
export const sellerAPI = {
  register: (sellerData) => {
    return api.post('/seller/register', sellerData);
  },
  
  getDashboardStats: () => {
    return api.get('/seller/dashboard-stats');
  },
  
  getProducts: () => {
    return api.get('/seller/products');
  }
};

// Admin specific APIs - Updated to work without authentication
export const adminAPI = {
  getDashboardStats: () => {
    return api.get('/admin/dashboard-stats', {
      headers: {
        'Bypass-Auth': 'true' // Custom header to bypass auth middleware
      }
    });
  },
  
  getUsers: () => {
    return api.get('/admin/users', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },
  
  getSellers: () => {
    return api.get('/admin/sellers', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },
  
  approveSeller: (sellerId) => {
    return api.put(`/admin/sellers/${sellerId}/approve`, {}, {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },
  
  rejectSeller: (sellerId) => {
    return api.put(`/admin/sellers/${sellerId}/reject`, {}, {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },

  // Add more admin endpoints as needed
  getOrders: () => {
    return api.get('/admin/orders', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },

  getProducts: () => {
    return api.get('/admin/products', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },

  getMaterials: () => {
    return api.get('/admin/materials', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },

  getWorkers: () => {
    return api.get('/admin/workers', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },

  getDesigns: () => {
    return api.get('/admin/designs', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  },

  getMachines: () => {
    return api.get('/admin/machines', {
      headers: {
        'Bypass-Auth': 'true'
      }
    });
  }
};

// Products - Updated to use real data
export const productAPI = {
  getAllProducts: () => {
    return api.get('/addproduct');
  },
  
  getProductById: (id) => {
    return api.get(`/product/${id}`);
  },
  
  addProduct: (productData, image) => {
    const formData = new FormData();
    
    // Add product data to form
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    
    // Add image if available
    if (image) {
      formData.append('image', image);
    }
    
    return api.post('/addproduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  updateProduct: (id, productData, image) => {
    const formData = new FormData();
    
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    
    if (image) {
      formData.append('image', image);
    }
    
    return api.put(`/updateproduct/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteProduct: (id) => {
    return api.delete(`/deleteproduct/${id}`);
  }
};

// Job APIs
export const jobAPI = {
  getAllJobs: () => {
    return api.get('/api/jobs');
  },

  getJobById: (id) => {
    return api.get(`/api/jobs/${id}`);
  },

  addJob: (jobData) => {
    return api.post('/api/jobs', jobData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateJob: (id, jobData) => {
    return api.put(`/api/jobs/${id}`, jobData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteJob: (id) => {
    return api.delete(`/api/jobs/${id}`);
  },

  getAllApplications: (params = {}, token) => {
    return api.get('/api/job-applications', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateApplicationStatus: (applicationId, status, token) => {
    return api.patch(`/api/job-applications/${applicationId}/status`, 
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  applyForJob: (jobId, applicationData) => {
    return api.post(`/api/job-applications`, {
      ...applicationData,
      jobId
    });
  }
};

// Materials - Updated to use real data
export const materialAPI = {
  getAllMaterials: () => {
    return api.get('/material/material');
  },
  
  getMaterialById: (id) => {
    return api.get(`/material/material/${id}`);
  },
  
  addMaterial: (materialData, image) => {
    const formData = new FormData();
    
    // Add material data to form
    Object.keys(materialData).forEach(key => {
      formData.append(key, materialData[key]);
    });
    
    // Add image if available
    if (image) {
      formData.append('image', image);
    }
    
    return api.post('/material/addMaterial', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  updateMaterial: (id, materialData, image) => {
    const formData = new FormData();
    
    // Add material data to form
    Object.keys(materialData).forEach(key => {
      formData.append(key, materialData[key]);
    });
    
    // Add image if available
    if (image) {
      formData.append('image', image);
    }
    
    return api.put(`/material/updateMaterial/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteMaterial: (id) => {
    return api.delete(`/material/deleteMaterial/${id}`);
  }
};

// Interior Design - Updated to use real data
export const designAPI = {
  getAllDesigns: () => {
    return api.get('/design/design');
  },
  
  getDesignById: (id) => {
    return api.get(`/design/design/${id}`);
  },
  
  addDesign: (designData, mainImage, additionalImages = []) => {
    const formData = new FormData();
    
    // Add design data
    Object.keys(designData).forEach(key => {
      formData.append(key, designData[key]);
    });
    
    // Add main image
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }
    
    // Add additional images
    additionalImages.forEach(image => {
      formData.append('images', image);
    });
    
    return api.post('/design/adddesign', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  updateDesign: (id, designData, mainImage, additionalImages = []) => {
    const formData = new FormData();
    
    // Add design data
    Object.keys(designData).forEach(key => {
      formData.append(key, designData[key]);
    });
    
    // Add main image if provided
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }
    
    // Add additional images
    additionalImages.forEach(image => {
      formData.append('images', image);
    });
    
    return api.put(`/design/updatedesign/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteDesign: (id) => {
    return api.delete(`/design/delete/${id}`);
  }
};

// Workers - Updated to use real data
export const workerAPI = {
  getAllWorkers: () => {
    return api.get('/workers');
  },
  
  getWorkerById: (id) => {
    return api.get(`/workers/${id}`);
  },
  
  addWorker: async (workerData, image) => {
    try {
      const formData = new FormData();
      
      // Add all worker data to form
      Object.keys(workerData).forEach(key => {
        if (workerData[key] !== null && workerData[key] !== undefined) {
          formData.append(key, workerData[key]);
        }
      });
      
      // Add image if available
      if (image) {
        formData.append('image', image);
      }
      
      const response = await api.post('/workers/addWorker', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      if (error.response?.status === 409) {
        throw new Error('A worker with this email already exists. Please use a different email address.');
      }
      throw error;
    }
  },
  
  updateWorker: async (id, workerData, image) => {
    try {
      const formData = new FormData();
      
      // Add all worker data to form
      Object.keys(workerData).forEach(key => {
        if (workerData[key] !== null && workerData[key] !== undefined) {
          formData.append(key, workerData[key]);
        }
      });
      
      // Add image if available
      if (image) {
        formData.append('image', image);
      }
      
      const response = await api.put(`/workers/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      if (error.response?.status === 409) {
        throw new Error('A worker with this email already exists. Please use a different email address.');
      }
      throw error;
    }
  },
  
  deleteWorker: (id) => {
    return api.delete(`/workers/delete/${id}`);
  }
};

// Payments - Updated to use real data
export const paymentAPI = {
  processPayment: (paymentData) => {
    return api.post('/api/payment', paymentData);
  },
};

// Inquiry API - Updated to use real data
export const inquiryAPI = {
  // Submit a new inquiry
  submitInquiry: (inquiryData) => {
    return api.post('/api/inquiries', inquiryData);
  },
  
  // Get all inquiries
  getAllInquiries: () => {
    return api.get('/api/inquiries');
  },
  
  // Get inquiry by ID
  getInquiryById: (id) => {
    return api.get(`/api/inquiries/${id}`);
  },
  
  // Update inquiry status
  updateInquiryStatus: (id, status) => {
    return api.patch(`/api/inquiries/${id}`, { status });
  },
  
  // Delete inquiry
  deleteInquiry: (id) => {
    return api.delete(`/api/inquiries/${id}`);
  }
};

// Consultants API - Updated to use real data
export const consultantAPI = {
  getAllConsultants: () => {
    return api.get('/consultants');
  },
  
  getConsultantById: (id) => {
    return api.get(`/consultants/${id}`);
  },
  
  getChatHistory: (consultantId) => {
    return api.get(`/consultants/${consultantId}/chat-history`);
  },
  
  sendMessage: (consultantId, message) => {
    return api.post(`/consultants/${consultantId}/messages`, { message });
  },
  
  rateConsultant: (consultantId, rating, review) => {
    return api.post(`/consultants/${consultantId}/rate`, { rating, review });
  }
};

// Cart functionality
export const cartAPI = {
  getCart: () => 
    api.get('/cart'),
  
  addToCart: (itemId, quantity) => 
    api.post('/cart/add', { itemId, quantity }),
  
  updateCartItem: (itemId, quantity) => 
    api.put('/cart/update', { itemId, quantity }),
  
  removeFromCart: (itemId) => 
    api.delete(`/cart/remove/${itemId}`),
  
  clearCart: () => 
    api.delete('/cart/clear'),
  
  checkout: (orderData) => 
    api.post('/cart/checkout', orderData),
};

// Chat API functions
export const getAllMessages = () => {
  return axios.get(`${API_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const sendMessage = (messageData) => {
  return axios.post(`${API_URL}/messages`, messageData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const markMessagesAsRead = (userId) => {
  return axios.put(`${API_URL}/messages/read/${userId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const orderAPI = {
  getAll: () => 
    api.get('/orders'),
  
  getById: (id) => 
    api.get(`/orders/${id}`),
  
  updateStatus: (id, status) => 
    api.put(`/orders/${id}/status`, { status }),
};

export default api; 