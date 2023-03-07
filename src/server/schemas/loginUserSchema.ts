import { Joi } from "express-validation";

const loginUserSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string(),
  }),
};

export default loginUserSchema;
