import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

        const emailExists = await User.findOne({where: {email: email}});
        if(emailExists){
            throw new CustomException("User with email already exists", 409);
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

const login = async (req, res) => {
    const result = validationResult(req);
    const {email, password} = req.body;
    try {
        if(!result.isEmpty()){
            throw new CustomException(result.errors[0].msg, 400);
        }
        const userExists = await User.findOne({where: {email: email}});
        console.log(userExists);
        if(!userExists){
            throw new CustomException("User does not exist", 404);
        }
        //else check the password
        const hashedPassword = userExists.password;
        let isCorrectPassword = await bcrypt.compare(password, hashedPassword);
        if(!isCorrectPassword){
            throw new CustomException("Password is wrong", 401);
        }
        
        console.log(process.env.SECRET_KEY);
        const token = jwt.sign({userId: userExists.id}, process.env.SECRET_KEY, {
            expiresIn: '1h',
        })

        res.status(200).json({
            status: "success",
            token: token
        })

    } catch (error) {
        res.status(error.statusCode).json({
            "status": "error",
            "message": error.message
        })
    }
}

export {signup, login};