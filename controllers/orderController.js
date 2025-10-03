const Orders = require("../models/orderModel");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const user_id = req.user.userId; // from token
    const { shoes_id, shoe_name, payment_method, total_amount, voucher_id } = req.body;

    if (!shoes_id || !voucher_id || !shoe_name || !payment_method || !total_amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const insertId = await Orders.create({
      user_id,
      shoes_id,
      voucher_id,
      shoe_name,
      payment_method,
      total_amount,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order_id: insertId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.getAll();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Orders.getById(order_id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get orders of logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const orders = await Orders.getByUserId(user_id);

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const affectedRows = await Orders.updateStatus(order_id, status);

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Order not found or not updated" });
    }

    res.status(200).json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const affectedRows = await Orders.delete(order_id);

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
