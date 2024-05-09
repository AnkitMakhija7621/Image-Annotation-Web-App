const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imageRoutes = require('./routes/images');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', imageRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = 5000;
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
