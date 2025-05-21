const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const path = require('path');
const idRoutes = require("./routes/idRoutes");

dotenv.config();

const hackathonRoutes = require("./routes/hackathonRoutes");
const formRoutes = require("./routes/formRoutes");
const leaveRoutes = require("./routes/leaveRoutes");


const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use("/hackathonuploads", express.static(path.join(__dirname, "hackathonuploads")));
app.use("/uploads", express.static("uploads")); 
app.use('/Idpdfs', express.static(path.join(__dirname, 'Idpdfs')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected Successfully!"))
  .catch(err => console.error("MongoDB error:", err));


// Routes
app.use("/api", hackathonRoutes);
app.use("/api", formRoutes);
app.use("/api", idRoutes);
app.use("/api", leaveRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
