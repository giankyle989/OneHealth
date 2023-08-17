const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const articleRoutes = require('./routes/articleRoutes')
const adminRoutes = require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')


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
app.use('/api/doctor', doctorRoutes)
app.use('/api/patient', patientRoutes)

app.listen(port, () => {
  console.log(`Server is running in port : ${port}`);
});
