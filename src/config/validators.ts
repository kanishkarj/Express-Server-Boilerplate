import { check, body, query, param, validationResult } from 'express-validator/check';
import User from '../models/user';

export let UserRegPostVal = [
    body('email').custom(value => {
        return User.findOne({email:value}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    body('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 8,max: 12 }),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    })
]

export let UserLoginPostVal = [
    body('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 8,max: 12 }),
]
