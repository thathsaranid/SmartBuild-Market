const OrderModel = require("../model/order.model");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    // Create order with default values if fields are missing
    const order = new OrderModel({
      user: req.user?._id, // Only add user if available
      items,
      total,
      shippingAddress: {
        name: shippingAddress?.name || 'Guest',
        email: shippingAddress?.email || 'guest@example.com',
        phone: shippingAddress?.phone || '0000000000',
        address: shippingAddress?.address || 'Default Address',
        city: shippingAddress?.city || 'Default City',
        postalCode: shippingAddress?.postalCode || '00000'
      }
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate('user', 'name email')
      .sort('-createdAt');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.id })
      .sort('-createdAt');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Check if user is admin or order owner
    if (req.user && req.user.role !== 'admin' && order.user && order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete order (admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    await OrderModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 