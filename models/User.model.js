const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;