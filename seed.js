const mongoose = require('mongoose');

const Project = require('./models/Project.model');
const Task = require('./models/Task.model');

mongoose.connect('mongodb://localhost:27017/projectManagmentCohort3')
  .then(connectObject => {

    console.log(`connected to db ${connectObject.connections[0].name}`);

    return Project.create({
      title: 'First Test Project',
      description: 'Hey it worked'
    });
      


  })
  .then(createdProject => {
    console.log(createdProject);

    return Task.create({
      title: 'Test a task',
      description: 'heyyyyy',
      project: createdProject._id
    });

    
  })
  .then(createdTask => {
    console.log(createdTask);

    return mongoose.connection.close()
  })
  .then(() => console.log('connection successfully closed'))
  .catch(err => console.log(err));


