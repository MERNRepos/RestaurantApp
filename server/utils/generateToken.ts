import Jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { Response } from 'express'


export const generateToken = (res: Response, user: IUserDocument) => {
    const token = Jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: "1d" });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Required if using sameSite: 'none'
        sameSite: 'lax', // or 'none' if doing cross-origin requests with credentials
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return token;
}
