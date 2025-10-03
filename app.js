const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");


const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const shoeRoutes = require("./routes/shoeRoutes");
const reviewRoutes = require("./routes/reviewRoutes");  
const colorsRoutes = require("./routes/colorsRoutes");
const newArrivalRoutes = require("./routes/newArrivalRoutes");          
const voucherRoutes = require("./routes/voucherRoutes");
const flashSaleRoutes = require("./routes/flashSaleRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const ewalletProviderRoutes = require("./routes/ewalletProviderRoutes");
const userEwalletRoutes = require("./routes/userEwalletRoutes");
const bankRoutes = require("./routes/bankRoutes");
const userVirtualAccountRoutes = require("./routes/userVirtualAccountRoutes");
const creditDebitCardRoutes = require("./routes/creditDebitCardRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const shippingAddressRoutes = require("./routes/shippingAddressRoutes");
const recentlyViewedRoutes = require("./routes/recentlyViewedRoutes");
const flashSaleItemRoutes = require("./routes/flashSaleItemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const shoeImageRoutes = require("./routes/shoeImageRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup for file uploads
const multer = require("multer");

// Ensure uploads folder exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Export multer to use in routes
app.locals.upload = upload;

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/shoes', shoeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/colors', colorsRoutes);
app.use('/api/new-arrivals', newArrivalRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/flashsales", flashSaleRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/ewallet-providers", ewalletProviderRoutes);
app.use("/api/user-ewallets", userEwalletRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/user-virtual-accounts", userVirtualAccountRoutes);
app.use("/api/cards", creditDebitCardRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/shipping-addresses", shippingAddressRoutes);
app.use("/api/recently-viewed", recentlyViewedRoutes);
app.use("/api/flash-sale-items", flashSaleItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shoe-images", shoeImageRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
