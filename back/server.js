const express = require('express')
const mongoose = require('mongoose')
const cors =require('cors')
const app =express();
const port =8080;
app.use(cors())

app.use(express.json())

  mongoose.connect('mongodb+srv://admin:admin@todolistdb.0nmh9.mongodb.net/Todolist?retryWrites=true&w=majority&appName=TodolistDB')
  .then(() => {
    console.log('Connected to MongoDB!');
    // Start the server only after successful connection to MongoDB
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });