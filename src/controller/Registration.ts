import { Request, Response, NextFunction } from "express";
import { Controllers, Middlewares } from "../config/interfaces";
import { check, validationResult} from 'express-validator/check';
import User, { AuthToken } from "../models/user";
import { WriteError } from "mongodb";
/**
 * GET /
 * Home page.
 */
export let SignUpEmail: Middlewares = (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body)
    
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
            res.status(500);
            return res.send("The EmailId already exists");
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
};

export let getOauthUnlink: Middlewares = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.params.provider;
    User.findById(req.user.id, (err, user: any) => {
      if (err) { return next(err); }
      user[provider] = undefined;
      user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider);
      user.save((err: WriteError) => {
        if (err) { return next(err); }
        req.flash("info", `${provider} account has been unlinked.`);
        res.redirect("/account");
      });
    });
  };
