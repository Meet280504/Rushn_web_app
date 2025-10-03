const Payment = require("../models/paymentModel");

// ✅ Create new payment
exports.createPayment = async (req, res) => {
  try {
    const user_id = req.user.userId; // fetch from token
    const { order_id, method_id, amount, status, transaction_ref } = req.body;

    if (!order_id || !method_id || !amount) {
      return res.status(400).json({ message: "order_id, method_id and amount are required" });
    }

    const paymentId = await Payment.create({
      user_id,
      order_id,
      method_id,
      amount,
      status: status || "pending",
      transaction_ref: transaction_ref || null,
    });

    res.status(201).json({
      message: "Payment created successfully",
      payment_id: paymentId,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all payments (Admin only)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.getAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const payment = await Payment.getById(payment_id);

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get logged-in user's payments
exports.getMyPayments = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const payments = await Payment.getByUserId(user_id);

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update payment
exports.updatePayment = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const { method_id, amount, status, transaction_ref } = req.body;

    const updated = await Payment.update(payment_id, {
      method_id,
      amount,
      status,
      transaction_ref,
    });

    if (!updated) return res.status(404).json({ message: "Payment not found or not updated" });

    res.status(200).json({ message: "Payment updated successfully" });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const { payment_id } = req.params;

    const deleted = await Payment.delete(payment_id);

    if (!deleted) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
