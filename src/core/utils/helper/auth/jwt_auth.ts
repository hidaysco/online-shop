import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
require('dotenv').config()

export const generate = async (payload: any,secondExpired: any)=>{
    const{_id, name, username, email}:any = payload
    payload = {_id,name,username,email}
    const privateKey: string = process.env.secret_key || "hidays"
    const verifyOptions:any = {
        algorithm: 'HS256',
        expiresIn: secondExpired ? secondExpired : '1000m'
    };
    const token = jwt.sign(payload, privateKey, verifyOptions);
    return token;
}

export const auth =  (req:Request,res:Response,next:NextFunction): any=>{
    const headers = req.headers.authorization as string
    const token:string = headers.split(' ')[1]
    const privateKey: string = process.env.secret_key || "hidays"
    try{
        const decoded:any = jwt.verify(token,privateKey)
        if (!decoded) {
            return res.status(401).send("Token Invalid")
        }
        req.user = decoded.name
        next()
    }catch(err){
        return res.send(err)
    }
}