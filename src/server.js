import express from "express";
import bodyParser from 'body-parser';
import logger from 'morgan';
import fRouter from './routes/flashcard.route.js';
import aRouter from './routes/auth.route.js';
import { connectDB } from "./config/mongoDB.config.js";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

connectDB();
const PORT = process.env.PORT || 3500;
const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use('/posts/', fRouter);
app.use('/user/', aRouter);

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}. tadaaa`);
})