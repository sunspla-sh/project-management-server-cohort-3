require('dotenv/config')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const { isAuthenticated } = require('./middlewares/jwt.middleware');

//const jsonParser = express.json;

mongoose.connect('mongodb://localhost:27017/projectManagmentCohort3')
  .then(connectObject => {
    console.log(`connected to db ${connectObject.connections[0].name}`);
  })
  .catch(err => console.log(err));

const app = express();

app.use(morgan('dev'));

app.use(cors({
  origin: [
    'http://localhost:3000'
  ]
}))

app.use(express.json());

const projectRoutes = require('./routes/project.routes');

app.use('/api', isAuthenticated, projectRoutes);

const taskRoutes = require('./routes/task.routes');

app.use('/api', isAuthenticated, taskRoutes);

const authRoutes = require('./routes/auth.routes');

app.use('/auth', authRoutes);

app.listen('3001', () => {
  console.log('hey we are listening on port 3001')
});