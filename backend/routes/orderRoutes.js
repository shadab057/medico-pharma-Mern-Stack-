import express from 'express';
import pdfKit from 'pdfkit';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin, mailgun, payOrderEmailTemplate } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      DiscountPrice: req.body.DiscountPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id/report',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('user').populate('orderItems.product');

    if (order) {
      const doc = new pdfKit();

      doc.text(`Order ID: ${order._id}`);
      doc.text(`Date: ${order.createdAt.toDateString()}`);

      // Add delivery price
      const deliveryPrice = 10;

      // Calculate total order price before discount and delivery charge
      let totalPriceBeforeDiscount = 0;

      doc.text(`User Name: ${order.user.name}`);
      doc.text(`Shipping Address:`);
      doc.text(`   Full Name: ${order.shippingAddress.fullName}`);
      doc.text(`   Address: ${order.shippingAddress.address}`);
      doc.text(`   City: ${order.shippingAddress.city}`);
      doc.text(`   Postal Code: ${order.shippingAddress.postalCode}`);
      doc.text(`   Country: ${order.shippingAddress.country}`);

      doc.text('\nOrdered Items:');

      order.orderItems.forEach((item, index) => {
        const itemTotalPrice = item.quantity * item.price;
        totalPriceBeforeDiscount += itemTotalPrice;

        doc.text(`S.No: ${index + 1}`);
        doc.text(`- Product: ${item.product.name}`);
        doc.text(`  Quantity: ${item.quantity}`);
        doc.text(`  Price: Rs ${item.price.toFixed(2)}`);
        doc.text(`  Total Price (before discount): Rs ${itemTotalPrice.toFixed(2)}`);
        doc.text(''); // Empty line for separation
      });

      // Apply discount
      const discountPercentage = 10;
      const discountAmount = (totalPriceBeforeDiscount * discountPercentage) / 100;

      // Add delivery charge
      const totalPriceAfterDelivery = totalPriceBeforeDiscount + deliveryPrice;

      // Calculate total order price after discount and delivery charge
      const totalPriceAfterDiscountAndDelivery = totalPriceBeforeDiscount - discountAmount + deliveryPrice;

      doc.text(`Discount Amount: -Rs ${discountAmount.toFixed(2)}`);
      doc.text(`Delivery Charge: +Rs ${deliveryPrice.toFixed(2)}`);
      doc.text(`Total Order Price (before discount and delivery): Rs ${totalPriceAfterDelivery.toFixed(2)}`);
      doc.text(`Total Order Price (after discount and delivery): Rs ${totalPriceAfterDiscountAndDelivery.toFixed(2)}`);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=OrderReport_${order._id}.pdf`);

      doc.pipe(res);
      doc.end();
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  })
);




orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'foodie <foodie@mg.yourdomain.com>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    
    if (req.user.role === 'admin' || (order && order.user.equals(req.user._id))) {
      if (order) {
        await order.remove();
        res.send({ message: 'Order Deleted' });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    } else {
      res.status(403).send({ message: 'User does not have permission to delete this order.' });
    }
  })
);

export default orderRouter;
