const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    default: 'World',
  },
  description: {
    type: String,
    default: '',
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}

const worldSchema = Schema(Object.assign(fields,references), { timestamps: true });

module.exports = {
  Model: mongoose.model('World', worldSchema),
  fields,
  references
};