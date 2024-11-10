import { UserModel } from "../model/user_model.js";


export class UserController {
    constructor() {
        this._userModel = new UserModel();
    }

    signUp = async (req, res) => {
        try {
            console.log(req.body)
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }

}