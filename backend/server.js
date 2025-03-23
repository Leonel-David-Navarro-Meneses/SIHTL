const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./auth");
const inventoryRoutes = require("./inventory");
const requestRoutes = require("./request");
const reportRoutes = require("./report");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/report", reportRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
