const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
 },
  description: {
     type: String
     },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;