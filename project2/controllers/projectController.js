const express = require('express');
const router = express.Router();
const Project = require('../db/models/project');
const Task = require('../db/models/task');

// Route handler to get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('index', { projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Error fetching projects');
  }
});

// Route handler to add a new project
router.post('/projects', async (req, res) => {
    console.log(req.body);
  const { name, description } = req.body;
  console.log(name, description);
  try {
    const project = new Project({ name, description, tasks: []});
    await project.save();
    // res.send("done");
    res.redirect('/projects');
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).send('Error creating project');
  }
});

router.delete('/projects/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    // Remove the project and its associated tasks from the database
    await Project.findByIdAndRemove(projectId);

    // Remove all tasks associated with the project
    await Task.deleteMany({ project: projectId });

    res.sendStatus(204); // Send a success response without any content
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send('Error deleting project');
  }
});

router.put('/projects/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  try {
    // Find the project by its ID and update the name
    const updatedProject = await Project.findByIdAndUpdate(projectId, { name ,description} , { new: true });

    // If the project does not exist, return an error
    if (!updatedProject) {
      return res.status(404).send('Project not found');
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating project name:', error);
    res.status(500).send('Error updating project name');
  }
});

module.exports = router;
