const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const articleRoutes = require('./routes/articleRoutes')
require("dotenv").config();
const adminRoutes = require('./routes/adminRoutes')

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mogodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection is established.");
});

// Model Routes
app.use("/api/article", articleRoutes);
app.use('/api/admin', adminRoutes)

app.listen(port, () => {
  console.log(`Server is running in port : ${port}`);
});
