const { Model, fields, references } = require('./model');

exports.fetch = async (req, res, next) => {
  const { query = {} } = req;
  let findQuery = {};
  if (query.userId) {
    findQuery = { userId: query.userId };
  }
  try {
    const doc = await Model.findOne(findQuery).exec();
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
        data: doc,
      });
    }
  } catch (err) {
    next(new Error(err))
  }
};

exports.create = async (req, res, next) => {
  const body = req.body;
  const { _id } = req.decoded;
  body.userId = _id;

  const document = new Model(body);
  try {
    const doc = await document.save();
    res.status(201); // CREATED
    res.json({ 
      success: true, 
      message: `${Model.modelName} has been created`, 
      data: doc
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { id = null } = req.params;
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
      res.status(200).json({ success: true, data: doc })
    }
  } catch (err) {
    next(new Error(err));
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updated = await Model.findByIdAndUpdate(id, {
      $set: body
    }, { });
    res.status(200).json({ 
      success: true, 
      message: `${Model.modelName} has been updated`,
      data: updated
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.delete = async (req, res, next) => {
  const { id = null } = req.params;
  try {
    const removed = await Model.deleteOne({ _id: id });
    res.status(200).json({ 
      success: true,
      message: `${Model.modelName} has been deleted`,
      data: removed
    });
  } catch (err) {
    next(new Error(err));
  }
};