import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post('/signup',[
    body('firstName').exists().notEmpty().withMessage("firstName is missing").trim().escape(),
    body('email').isEmail().withMessage('It is not a valid email').trim().escape(),
    body('password').exists().notEmpty().withMessage("Password is required").trim().escape()
    ],
    signup)

export default router;
