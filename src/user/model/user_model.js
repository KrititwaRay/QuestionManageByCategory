import mongoose from "mongoose";

export class UserModel {
    constructor() {
        const schema = new mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                qunque: true,
                lowercase: true,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            profilePicture: {
                type:  String,
                default: ''
            }
        },{
            timestamps: true,
            versionKey: false,
            collection: 'Users'
        })

     this.User = mongoose.model('User', schema)
    }
}