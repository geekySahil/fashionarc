const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/auth/auth-routes.js");
const productRouter = require("./routes/admin/product-route.js");
const shoppingRouter = require("./routes/shopping/shopping-route.js");
const cartRouter = require("./routes/shopping/cart-route.js");
const addressRouter = require("./routes/address/address-route.js");
const orderRouter = require("./routes/shopping/order-route.js");
const adminOrderRouter = require("./routes/admin/order-route.js");
const reviewRouter = require("./routes/shopping/review-route.js");
const featureRouter = require("./routes/common/featureImage-route.js");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "https://fashionarc.vercel.app",
  "https://fashionarc-sahils-projects-b6d8d58f.vercel.app", // optional, if still needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", productRouter);
app.use("/api/shopping/products", shoppingRouter);
app.use("/api/shopping/cart", cartRouter);
app.use("/api/shopping/address", addressRouter);
app.use("/api/shopping/order", orderRouter);
app.use("/api/shopping/review", reviewRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/common/feature", featureRouter);

// console.log(`${process.env.MONGODB_URI}`, 'MONGODB')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(`Failed to connect: ${error}`);
  });

app.listen(port, () => {
  console.log(`App is running at port: ${port}`);
});
