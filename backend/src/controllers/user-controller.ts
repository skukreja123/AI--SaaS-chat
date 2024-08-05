import User from "../models/User.js"
import { Request, Response, NextFunction } from 'express';
import {hash,compare} from 'bcrypt';
import { createtoken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";




export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({message: "OK",users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "ERROR", cause : error.message });
    }
};


export const UserSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name,email,password} = req.body;
        const existance = await User.findOne({email});
        if(existance) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password,10);
        const user = new User({name,email,password:hashedPassword});
        await user.save();


        // store cookie
        res.clearCookie(COOKIE_NAME,{
            httpOnly: true,
            domain: "localhost",
            signed : true,
            path:"/",
        });

        const token = createtoken(user._id.toString(),user.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,
        {path:"/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed : true,
        });

        return res.status(200).json({message: "OK",name:user.name, email:user.email});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "ERROR", cause : error.message });
    }
};


export const userlogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(401).send("User not registered");
        }
        const isPassward = await compare(password,user.password);
        if(!isPassward)
        {
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME,{
            httpOnly: true,
            domain: "localhost",
            signed : true,
            path:"/",
        });

        const token = createtoken(user._id.toString(),user.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,
        {path:"/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed : true,
        });
        return res.status(200).json({message:"OK", name:user.name, email:user.email});



    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "ERROR", cause : error.message });
    }
};


export const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user)
        {
            return res.status(401).send("User not registered OR Token Mailfunctioned ");
        }
        if(user._id.toString() !== res.locals.jwtData.id)
        {
            return res.status(401).send("Permission not matach");
        }

        console.log(user._id.toString());
        console.log(res.locals.jwtData.id);
        
        
    
        return res.status(200).json({message:"OK", name:user.name, email:user.email});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "ERROR", cause : error.message });
    }
};
 