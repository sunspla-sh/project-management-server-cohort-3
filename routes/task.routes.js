const express = require('express');

const router = express.Router();

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

router.post('/tasks', (req, res, next) => {

  const { title, description, projectId } = req.body;

  let newTask;

  Task.create({
    title,
    description,
    project: projectId
  })
    .then(createdTask => {
      console.log(createdTask);
      newTask = createdTask;
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: createdTask._id }
      }, {
        new: true
      });
    })
    .then(updatedProject => {
      console.log(updatedProject);
      res.json({ message: 'POST tasks worked', task: newTask, project: updatedProject });
    })
    .catch(err => res.json(err));

  
});

module.exports = router;