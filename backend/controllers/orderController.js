import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { sendSingleMail } from '../utils/emailService.js';

// @desc Create new Order
// @route OOST /api/orders
// @privacy Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff
    // get the ordered items from our database

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    sendSingleMail({
      email: req.user.email,
      subject: 'Order Confirmation - Thank You for Your Purchase!',
      text: `
Dear ${req.user.firstName || 'Valued Customer'},

Thank you for your order on Cesol3nery! We’re excited to let you know that your order has been successfully placed.

### Order Details:
- **Order Id:** ${createdOrder._id || 'N/A'}
- **Order Date:** ${new Date().toLocaleDateString()}
- **Total Amount:**  ${createdOrder.totalPrice.toLocaleString() || 'N/A'} Naira

Your order is currently being processed, and we’ll notify you once it’s ready for shipment.

If you have any questions or need assistance, please don't hesitate to reach out to our support team 

Thank you for choosing Cesol3nery. We look forward to serving you again!
  `,
    });

    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in users orders
// @route GET /api/orders/mine
// @privacy Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    res.status(404);
    throw new Error('No orders found');
  }
  res.status(200);
  res.json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @privacy Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'firstName lastName email phone'
  );

  if (order) {
    res.status(200);
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  update order to paid
// @route PUT /api/orders/:id/pay
// @privacy Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  update order to delivered
// @route PUT /api/orders/:id/deliver
// @privacy Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Get all orders
// @route GET /api/orders
// @privacy Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;
  
  
  let query = {};

  const count = await Order.countDocuments(query)
  const orders = await Order.find({})
    .populate('user', 'id firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (!orders) {
    res.status(404);
    throw new Error('No orders found');
  }
  res.status(200);
  res.json({orders, totalPages: Math.ceil(count / pageSize)});
});
// @desc Get user  orders
// @route GET /api/orders
// @privacy Private/Admin
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id }).populate(
    'user',
    'id firstName lastName email address phone'
  );
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getUserOrders,
};
