import joi from "joi";

const validateUser = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(8).required(),
});

export { validateUser };
