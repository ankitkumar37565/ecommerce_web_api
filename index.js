const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
//connect to db
require("./config/mongoose").connectdb();
//import the models
const Order = require("./models/order");
const Payment = require("./models/payment");
const Product = require("./models/product");
const User = require("./models/user");
//global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (err, req, res, next) {
  console.log(err);
  res.json({ message: "something went wrong" });
});
//import the routes
const orderRouter = require("./routes/orderRoutes.js");
const paymentRouter = require("./routes/paymentRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");
app.use("/", orderRouter);
app.use("/", paymentRouter);
app.use("/", productRouter);
app.use("/", userRouter);
//start the app
app.listen(process.env.port, () => {
  console.log(`server running on port : ${process.env.port}`);
});
