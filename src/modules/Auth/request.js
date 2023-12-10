const Joi = require('joi');

const adminSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),

});

const adminValidate = (data) => {
  const result = adminSchema.validate(data);
  result.value = data;
  return result;
};

module.exports = { adminValidate };
