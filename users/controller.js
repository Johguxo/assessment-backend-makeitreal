const { Model, fields } = require('./model');
const { sign } = require('jsonwebtoken');
const cloudinary = require('../helpers/imageUpload');
const fs = require('fs');

exports.signup = async (req, res, next) => {
  const body = req.body;
  const document = new Model(body);

  try {
    const user = await document.save();
    const { _id } = user;
    const token = sign({ _id }, 'johguxo', { expiresIn: 60 * 60 });
    res.status(201); // Created
    res.json({ 
      success: true,  
      data: user,
      meta: {
        token,
      }
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.signin = async (req, res, next) => {
  const body = req.body;
  const { email = '', password = '' } = body;
  try {
    const user = await Model.findOne({ email }).exec();
    if (!user) {
      res.status(404);
      res.json({ 
        success: false, 
        message: `Not found`,
      });
    } else {
      const isVerifiedPassword = await user.verifyPassword(password);
      if (!isVerifiedPassword) {
        res.status(401);
        res.json({ 
          success: false, 
          message: `Email or Password are invalid`,
        });
      } else {
        const { _id } = user;
        const token = sign({ _id }, 'johguxo', { expiresIn: 60 * 60 });
        res.status(200);
        res.json({
          success: true,
          data: user,
          meta: {
            token,
          }
        });
      }
    }
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await Model.findById(id).exec();
    if (!doc) {
      const message = `${Model.modelName} not found`;
      next({
        message,
        statusCode: 404,
        level: 'warn'
      })
    } else {
      res.status(200).json({ 
        success: true, 
        data: doc  
      });
    }
  } catch (err) {
    next(new Error(err));
  }
}

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const data = { firstName, lastName }
  const imageFile = req.file;
  try {
    if (imageFile) {
      cloudinary.uploader.upload(
        imageFile.path,
        async function (error, result) {
          if (error) {
            return next(new Error(error));
          }
          const updated = await Model.findByIdAndUpdate(
            id,
            {
              ...data,
              image: result.url,
            },
            { new: true },
          );
          res.status(200).json({ 
            success: true, 
            message: `${Model.modelName} has been updated`,
            data: updated
          });
        });
    } else {
      const updated = await Model.findByIdAndUpdate(
        id,
        {
          ...data,
        },
        { new: true },
      );
      res.status(200).json({ 
        success: true, 
        message: `${Model.modelName} has been updated`,
        data: updated
      });
    }
  } catch (err) {
    next(new Error(err));
  }
}