const express = require('express');
const router = express.Router();

const Project = require('../models/Project.model');

router.post('/projects', (req, res, next) => {

  console.log(req.body);

  const { title, description } = req.body;

  Project.create({
    title,
    description
  })
    .then(createdProject => {
      res.json({ message: 'POST projects worked', project: createdProject });
    })
    .catch(err => res.json(err));

  
});

router.get('/projects', (req, res, next) => {
  
  Project.find()
    .then(foundProjectArray => {
      console.log(foundProjectArray);
      res.json({ message: 'GET projects worked', projects: foundProjectArray });
    })
    .catch(err => res.json(err));
  
});

router.get('/projects/:projectId', (req, res, next) => {

  const { projectId } = req.params;

  Project.findById(projectId)
    .then(foundProject => {
      res.json({ message: 'GET projects/:projectId worked ' + projectId, project: foundProject });
    })
    .catch(err => res.json(err));
  
});

router.put('/projects/:projectId', (req, res, next) => {
  const { projectId } = req.params;

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then(updatedProject => {
      console.log(updatedProject);
      res.json({ message: 'PUT projects/:projectId worked ' + projectId, project: updatedProject });
    })
    .catch(err => res.json(err));

  
});

router.delete('/projects/:projectId', (req, res, next) => {
  const { projectId } = req.params;
  Project.findByIdAndDelete(projectId)
    .then(deletedProject => {
      console.log(deletedProject);
      res.json({ message: 'DELETE projects/:projectId worked ' + projectId, project: deletedProject });
    })
    .catch(err => res.json(err));
  
});

module.exports = router;