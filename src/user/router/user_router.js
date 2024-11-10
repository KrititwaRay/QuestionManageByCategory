import express from "express";
const router = express.Router();


import { UserController } from "../controller/user_controller.js";
const userController = new UserController();

import { CommonMiddleware } from "../../helper/common_middleware.js";
const commonMiddleware = new CommonMiddleware();

import { UserMiddleware } from "../middleware/user_middleware.js";
const userMiddleware = new UserMiddleware(); 

let middleware = []


middleware = [

    userMiddleware.signupValidation(),
    commonMiddleware.checkForErrors
]
router.route('/signup').post(middleware, userController.signUp);


middleware = [

    // userMiddleware.signupValidation(),
    commonMiddleware.checkForErrors
]
router.route('/login').post(middleware, userController.logIn);


middleware = [

    // userMiddleware.signupValidation(),
    commonMiddleware.checkForErrors
]
router.route('/view-profile').post(middleware, userController.viewUserProfile)


export const user_router = router;
