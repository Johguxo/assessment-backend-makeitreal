const { Model, fields } = require('./model');
const { sign } = require('jsonwebtoken');

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
        const { _id, image, firstName, lastName, email } = user;
        const token = sign({ _id }, 'johguxo', { expiresIn: 60 * 60 });
        res.status(200);
        res.json({
          token,
          _id,
          firstName,
          lastName,
          email,
          image,
        });
      }
    }
  } catch (err) {
    next(new Error(err));
  }
};