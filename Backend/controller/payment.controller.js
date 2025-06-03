const stripe = require('../config/stripe');
const Order = require('../model/order.model');
const { isAuthenticated } = require('../middleware/auth.middleware');

// Create a payment intent and order
exports.createPaymentIntent = async (req, res) => {
    try {
        const { 
            items, 
            shippingAddress,
            subtotal,
            tax,
            shipping,
            discount,
            total
        } = req.body;

        if (!items?.length || !shippingAddress || !total) {
            return res.status(400).json({ 
                error: 'Missing required order information' 
            });
        }

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Convert to cents
            currency: 'lkr',
            automatic_payment_methods: { enabled: true },
            metadata: {
                userId: req.user._id.toString(),
                orderItems: JSON.stringify(items.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })))
            }
        });

        // Create order in pending state
        const order = new Order({
            user: req.user._id,
            items: items.map(item => ({
                productId: item.id,
                productModel: item.type || 'Material',
                name: item.name || item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image || item.img
            })),
            shippingAddress,
            paymentInfo: {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
                amount: total,
                currency: 'lkr'
            },
            subtotal,
            tax,
            shipping,
            discount,
            total
        });

        await order.save();

        res.json({ 
            clientSecret: paymentIntent.client_secret,
            orderId: order._id
        });
    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Handle successful payment
exports.handlePaymentSuccess = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        // Find the order
        const order = await Order.findOne({
            'paymentInfo.paymentIntentId': paymentIntentId
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Update order status
        order.status = 'processing';
        order.paymentInfo.status = 'succeeded';
        await order.save();

        res.json({ success: true, order });
    } catch (error) {
        console.error('Payment success handling error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
exports.getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if user owns the order
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json({ order });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ error: error.message });
    }
};