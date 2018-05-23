import { Request, Response, NextFunction } from "express";
import { Controllers, Middlewares } from "../config/interfaces";
import { check, validationResult} from 'express-validator/check';
import User, { AuthToken, UserModel } from "../models/user";
import { WriteError } from "mongodb";
import * as passport from 'passport';
import { IVerifyOptions } from "passport-local";
import * as jwt from 'jsonwebtoken';
/**
 * GET /
 * Home page.
 */
export let LogInEmail: Middlewares = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, user: UserModel, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
        return res.send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      const token = jwt.sign(user.toObject(), 'your_jwt_secret');
      return res.json({user,token});
    });
})(req, res, next);
};

