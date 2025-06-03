const Inquiry = require('../model/inquiry.model');

// Create a new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body;
    
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      type: type || 'general'
    });
    
    const savedInquiry = await newInquiry.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Inquiry submitted successfully!',
      data: savedInquiry 
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit inquiry' 
    });
  }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch inquiries' 
    });
  }
};

// Get inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch inquiry' 
    });
  }
};

// Update inquiry status
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }
    
    inquiry.status = status;
    await inquiry.save();
    
    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update inquiry' 
    });
  }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }
    
    await Inquiry.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete inquiry' 
    });
  }
}; 