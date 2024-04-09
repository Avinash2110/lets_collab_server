import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import CustomException from "../errors/CustomException.js";

const signup =  async (req, res) =>{

    const result = validationResult(req);
    
    const {firstName, lastName, email, password} = req.body;

    try {

        if(!result.isEmpty()){
            throw new CustomException(result.errors[0].msg, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
        const userResponse = {
            id : user.id,
            firstName: user.firstNam,
            lastName: user.lastName,
            email: user.lastName,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt
        }
        res.status(201).json({
            message: "User created successfully",
            userResponse
        })

    } catch (error) {
        res.status(error.statusCode).json({
            "status": "error",
            "message": error.message,
        })
    }
}

export {signup};