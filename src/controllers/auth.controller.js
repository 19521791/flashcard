import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/auth.model.js';
import 'dotenv/config';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try{
        if (!email || !password) {
            return res.status(400).json({ message: "email, password are required!" });
          }

        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "Unauthorized" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."});

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
        
        const token = jwt.sign(
            { 
                email: existingUser.email, 
                id: existingUser._id,
            }, 
            accessTokenSecret, 
            { 
                expiresIn: accessTokenLife
            });

        const refreshToken = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            refreshTokenSecret,
            {
                expiresIn: refreshTokenLife,
            }
        )
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ existingUser, token});
    } catch(err){
        res.status(500).json({ message: "Something went wrong."});
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, } = req.body;

    try{
        if (!email || !password || !firstName || !lastName)
        return res
        .status(400)
        .json("email, password, firstName , lastName are required!");

        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists."});

        if( password !== confirmPassword ) return res.status(400).json({ message: "Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        if (result) {
            res.status(201).json({ message: `${email} register successfully` });
          } else {
            res.status(400);
          }
    } catch(err){
        res.status(500).json({ message: err.message});
    }
};

export const logout = (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) return res.status(204);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });

    res.json({ message: "Cookie cleared" });
}