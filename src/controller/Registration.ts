import { Request, Response } from "express";
import { Controllers, Middlewares } from "../config/interfaces";
import { check, validationResult} from 'express-validator/check';
import User from "../models/user";
/**
 * GET /
 * Home page.
 */
export let index: Middlewares = (req: Request, res: Response, next: any) => {
    const user = new User(req.body)
    
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
          req.flash("errors", "Account with that email address already exists.");
          return res.redirect("/signup");
        }
        user.save((err) => {
          if (err) { return next(err); }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            return res.redirect("/");
          });
        });
    });
    
    return res.json(req.body);
};
