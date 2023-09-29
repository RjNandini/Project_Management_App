const express = require('express');
const connectDB = require('./db/mongoose');
const mongoose = require('mongoose');
const app = express();
const projectController = require('./controllers/projectController');
const taskController = require('./controllers/taskController');
app.use(express.json());
connectDB();

app.use(projectController);
app.use(taskController);

app.set('view engine', 'ejs');
app.use(express.static('public'));

// const Project = mongoose.model("project");


app.get('/', (req,res) => {                  
    res.redirect('/projects');
});



app.listen(3000, () => {
    console.log("listening on port 3000");
});