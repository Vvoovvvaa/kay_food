import * as Joi from "joi";

export const validationScehma = Joi.object({
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_SECRET1: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER:Joi.string().required(),
  DATABASE_PASSWORD:Joi.string().required(),
  DATABASE_PORT:Joi.number().required(),
})