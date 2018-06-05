import { check, body, query, param, validationResult } from 'express-validator/check';
import User from '../models/user';

export let UserRegPostVal = [
    body('email').custom((value) => {
        return User.findOne({email:value}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    body('email').isEmail().normalizeEmail(),
    check('passwordConfirmation').custom((value,{req}) => {
        return value === req.body.password;
    }),
    check('password').isLength({ min: 8,max: 12 }),
]

export let UserLoginPostVal = [
  body('email').custom((value) => {
      return User.findOne({email:value}).then(user => {
          if (!user) {
              return Promise.reject('The E-mail doesn\'t exist.');
          }
      });
  }),
  check('password').isLength({ min: 8,max: 12 }),
]
