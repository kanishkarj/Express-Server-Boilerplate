import { check, validationResult} from 'express-validator/check';

export let UserRegValidator = [
    // email check 
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 8 }),
    
];