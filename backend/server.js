const express = require('express');
const mongoose = require('mongoose');

// require('dotenv').config({path: '../.env'})

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

var options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  };
mongoose.connect('mongodb://db:27017', options)
  .catch(err => {
    console.log(err)
  })
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  })

const authRouter = require('./routes/auth');
app.use('/auth', authRouter); 

app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
});