const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hash, compare } = require('bcryptjs');

const fields = {
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/johguxo-gonzales/image/upload/v1656618838/nauta_ledvrn.png'
  }
};

const userSchema = Schema(fields, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

userSchema.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});


const hiddenFields = ['password'];

userSchema.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  hiddenFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
}

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
}

module.exports = {
  Model: mongoose.model('User', userSchema),
  fields
};