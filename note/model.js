const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
  },
  description: {
    type: Array,
    default: [],
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}

const noteSchema = Schema(Object.assign(fields,references), { timestamps: true });

module.exports = {
  Model: mongoose.model('Note', noteSchema),
  fields,
  references,
};