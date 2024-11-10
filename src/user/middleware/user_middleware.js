import { check } from "express-validator";

export class UserMiddleware {


    signupValidation(){
        return [
            check('username').trim().not().isEmpty().withMessage('Required username.'),
            check('email').trim().not().isEmpty().withMessage('Required email.').isEmail().withMessage('Please provide valid email.'),
            check('passwors').trim().not().isEmpty().withMessage('Required passwors.'),
            check('confirm_password').custom((val, { req }) => {
                if(!(val === req.body.confirm_password)){
                    throw new Error('Passwords do not match.');
                }
                return true
            })
        ]
    
    }
}
