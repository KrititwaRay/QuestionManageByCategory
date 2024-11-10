import { UserModel } from "../model/user_model.js";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

export class UserController {
    constructor() {
        this._userModel = new UserModel();
    }

    signUp = async (req, res) => {
        try {
            let { username, email, password } = req.body;
            let userExists = await this._userModel.User.aggregate([
              {
                $match: { email: email }
              },
              { $count: "userCount" }
            ]);

            const isUserExist = userExists.length > 0 && userExists[0]?.userCount > 0
         
            if(isUserExist){
                return res.status(409).json({
                    status: false,
                    data: {},
                    message: "A user with the provided credentials already exists. Please try another email."
                })
            }

            let { _id } = await this._userModel.User.create({ username, email, password })
           
            return res.status(201).json({ status: true, data: { _id }, message: "Signup successful." })

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }


    logIn = async (req, res) => {
        try {
            let { email, password } = req.body;
            let user = await this._userModel.User.aggregate([
              {
                $match: { email: email }
              },
              {
                $project: {
                    _id: "$_id",
                    username: "$username",
                    email: "$email",
                    password: "$password"
                }
              }
            ]);
           
            if(user.length === 0 || (!await bcrypt.compare(password, user[0].password))){
                return res.status(404).json({
                    status: false,
                    data: {},
                    message: "Invalid email or password."
                });
            }
            const token = await this.generateAccessToken(user[0]._id)
          
            return res.status(200).cookie('token',token,{httpOnly: true, secure: true}).json({
                status: true,
                data: {
                    id: user[0]._id,
                    token
                },
                message: "Login successful."
            });

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }


    generateAccessToken = async (userId) => {

        try {
            const user = await this._userModel.User.findById(userId);
            const accessToken = await user.generateAccessToken();
            return accessToken
        } catch (error) {
            throw new Error("An error occurred while generating tokens.");
        }
    }


    viewUserProfile = async (req, res) => {
        try {
           
            let user = await this._userModel.User.aggregate([
                { 
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.body.id)
                    }
                },
                {
                    $project: {
                        password: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0
                    }
                }
            ])

            return res.status(200).json({ status: true, data: {
                id : user[0]._id,
                username : user[0].username,
                email : user[0].email,
                profilePicture : user[0].profilePicture
            },
            message: "User profile fetched successfully."
         })

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }

}