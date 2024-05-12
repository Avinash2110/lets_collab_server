import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post('/signup',[
    body('firstName').exists().notEmpty().withMessage("firstName is missing").trim().escape(),
    body('email').isEmail().withMessage('It is not a valid email').trim().escape(),
    body('password').exists().notEmpty().withMessage("Password is required").trim().escape()
], signup);

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email').trim().escape(),
    body('password').exists().notEmpty().withMessage("Password is required").trim().escape()
], login);

export default router;
