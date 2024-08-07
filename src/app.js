import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import groupRouter from "./routes/group.route.js";
import sequelize from "./configs/dbConfig.js";

dotenv.config();

const app = express();

//testing the db connection
async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log('DB connection established');
    }
    catch(e){
        console.log(`error conecting db - ${e}`);
    }
}

//syncing the models with the db
async function syncModel(){
    await sequelize.sync({force: false});
    console.log("Model synced successfully")
}

testConnection();
syncModel();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/group", groupRouter);

export default app;