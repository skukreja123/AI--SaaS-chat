import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";
import { log } from "console";
import { resolve } from "path";
import { rejects } from "assert";

export const createtoken = (id:string, email: string, expiresIn:string) =>{
    const payload  = {id, email};
    const token  =  jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn,
    });

    return token;
}

export const verifytoken = async (req: Request, res: Response, next: NextFunction) =>{
    const token = req.signedCookies[`${COOKIE_NAME}`];

    if(!token || token.trim()=== ""){
        return res.status(401).json({message: "Token not recived"});
    }

    return new Promise<void>((resolve,reject) =>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err)
            {
                reject(err.message);
                return res.status(401).json({message:"Token Expired"})
            }
            else{
                console.log("token verification successfull");
                resolve();
                res.locals.jwtData = success;
                return next();

                
            }
        })
    })
}