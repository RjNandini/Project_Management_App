const express = require('express');
const router = express.Router();
const Task = require('../db/models/task');
const Project = require('../db/models/project');

// Route handler to add a new task to a specific project
router.post('/projects/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  try {
    const task = new Task({ name, description, project: projectId });
    await task.save();

    // Update the associated project's tasks array
    const project = await Project.findById(projectId);
    project.tasks.push(task._id);
    await project.save();

    res.redirect(`/projects/${projectId}/tasks`);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Error creating task');
  }
});


router.get('/projects/:projectId/tasks', async (req, res) => {
    const { projectId } = req.params;
    try {
      // Find the project by its ID and populate its tasks
      const project = await Project.findById(projectId).populate('tasks');
      const currProject = await Project.findById(projectId);
      const projects = await Project.find();
      if (!project) {
        return res.status(404).send('Project not found');
      }
      const currProjectId = projectId;
      res.render('tasks', { projects, project, currProjectId });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Error fetching tasks');
    }
  });

  router.delete('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
      // Find and delete the task by its ID
      await Task.findByIdAndDelete(taskId);
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Error deleting task');
    }
  });


module.exports = router;
