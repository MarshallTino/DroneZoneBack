import { Joi } from "express-validation";

const registerUserSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().required(),
  }),
};

export default registerUserSchema;
