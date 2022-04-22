const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxLength: 255,
  },
  link: {
    type: String,
    required: true,
    default: ''
  }
};

const favSchema = Schema(Object.assign(fields), { timestamps: true });

module.exports = {
  Fav: mongoose.model('Fav', favSchema),
  fields
};