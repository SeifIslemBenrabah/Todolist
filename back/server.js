const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/user.route.js');
const loginRoute = require('./routes/login.route.js');
const projectsRoute = require('./routes/projects.route.js')
const tasksRoute = require('./routes/task.route.js')
const port = 8080;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/project", projectsRoute);
app.use("/task", tasksRoute);
mongoose.connect('mongodb+srv://seif:admin@todolistdb.0nmh9.mongodb.net/?retryWrites=true&w=majority&appName=TodolistDB')
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
