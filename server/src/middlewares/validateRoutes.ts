import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      res.status(400).json({
        error: err.details
          ? err.details.map((detail: any) => detail.message)
          : ['Invalid request'],
      });
    }
  };
};
