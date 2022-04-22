const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  list : [{
    type: Schema.Types.ObjectId,
    ref: 'Fav',
    required: false,
  }]
};

const listFavsSchema = Schema(Object.assign(fields, references), { timestamps: true });

module.exports = {
  Model: mongoose.model('ListFavs', listFavsSchema),
  fields,
  references
};