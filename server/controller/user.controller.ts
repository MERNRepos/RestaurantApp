import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullname, email, password, contact } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({
                success: false,
                message: 'User already exist with this mail'
            });
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();

        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        generateToken(res, user);
        await sendVerificationEmail(email, verificationToken)
        const userWithoutPassword = await User.findOne({ email }).select('-password');

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: userWithoutPassword
        });
        return

    } catch (error) {
        console.log("signup error", error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            });
            return
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            });
        }
        generateToken(res, user);
        user.lastLogin = new Date();
        const userWithoutPassowrd = await User.findOne({ email }).select('-password');

        res.status(201).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassowrd
        });

    } catch (error) {
        console.log("Login Error", error);
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const verifyMail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { verificationCode } = req.body;
        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        }).select('-password');


        if (!user) {
            res.status(404).json({
                succues: false,
                message: 'Invalid or expired verification code'
            });
            return
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save();
        await sendWelcomeEmail(user.email, user.fullname);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user
        })

    } catch (error) {
        console.log("verifyMail Error", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token').status(200).json({
            success: true,
            message: 'Logout successfully'
        });
        return
    } catch (error) {
        console.log("logout Error", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
            return

        }
        const resetToken = await crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save()
        // send email
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });
        return

    } catch (error) {
        console.log("forgotPassword Error", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.params;
        const { newPassowrd } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: {
                $gt: Date.now()
            }
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
            return
        }

        const resetPassword = await bcrypt.hash(newPassowrd, 10);
        user.password = resetPassword
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });

    } catch (error) {
        console.log("resetPassword Error", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return
        };
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("checkAuth error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id;
        const { fullname, email, address, city, country, profilePicture } = req.body;
        // upload image on cloudinary
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedData = { fullname, email, address, city, country, profilePicture };

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        res.status(200).json({
            success: true,
            user,
            message: "Profile updated successfully"
        });
    } catch (error) {
        console.log("updateProfile Error in user controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}