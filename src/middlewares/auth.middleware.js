import jwt from "jsonwebtoken";
import CustomException from "../errors/CustomException.js";

const isSignedIn = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    try {
        if(!bearerToken || !bearerToken.startsWith("Bearer ")){
            throw new CustomException("User is not authorized", 401);
        }
        const token = bearerToken.split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(`decoded json ${decodedToken}`);
        if(!decodedToken.hasOwnProperty('userId')){
            throw new CustomException("Invalid authorization token", 401);
        }
        req.userId = decodedToken.userId;
        next();

    } catch (error) {
        if(!error.hasOwnProperty("statusCode")){
            error["statusCode"] = 401;
        }
        res.status(error.statusCode).json({
            "status": "error",
            "message": error.message,
        })
    }
}

export {isSignedIn};