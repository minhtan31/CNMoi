require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const customerRoutes = require("./routes/customerRoutes");

const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));


// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
  });
});


// CUSTOMER ROUTES
app.use("/api/customers", customerRoutes);


// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});