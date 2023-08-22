import jwt from 'jsonwebtoken';
import { verifyToken } from '../helper/jwt.helper.js';
import 'dotenv/config';

const isAuth = async ( req, res, next) => {
    try{
        const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

        if(tokenFromClient) {

            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

            const decoded = await verifyToken(tokenFromClient, accessTokenSecret);

            console.log("Decoded: ", decoded);

            req.userId = decoded?.userId;

            console.log(`req.userID: ${req.userId}`);
        } 

        next();
    } catch(err) {
        console.log(err);
    }
};

export default isAuth;