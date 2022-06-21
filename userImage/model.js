const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  image: {
    type: String,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}

const userImageSchema = Schema(Object.assign(fields,references), { timestamps: true });

module.exports = {
  UserImage: mongoose.model('UserImage', userImageSchema),
  fields
};