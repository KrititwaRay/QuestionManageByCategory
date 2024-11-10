import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

        schema.pre('save', async function (next) {
            if (!this.isModified('password')) return next();
            this.password = await bcrypt.hash(this.password, 10);
            next();
        })

     this.User = mongoose.model('User', schema)
    }
}