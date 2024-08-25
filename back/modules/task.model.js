const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: {type: String},
  status: { type: String, enum:['complete', 'in progress', 'to do'], default: 'to do' },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = mongoose.model('Task', TaskSchema);