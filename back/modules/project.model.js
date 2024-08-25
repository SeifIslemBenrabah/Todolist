const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: {type: String},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Project', ProjectSchema);