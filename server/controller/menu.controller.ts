import { Request, Response, } from "express";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is required for addMenu "
            })
            return
        };
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const menu: any = await Menu.create({
            name,
            description,
            price,
            image: imageUrl
        });
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await restaurant.save();
        }
        res.status(201).json({
            success: true,
            message: 'Menu added successfully'
        });
        return
    } catch (error) {
        console.log("addMenu Error", error);
        res.status(500).json({ message: "Internal server error" });
        return
    }
}

export const editMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const menu = await Menu.findById(id);

        if (!menu) {
            res.status(400).json({
                success: false,
                message: "Menu not found"
            })
            return
        }

        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is required"
            })
            return
        };
        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl
        }

        if (name) menu.name = name
        if (description) menu.description = description
        if (price) menu.name = price
        await menu.save();

        res.status(200).json({
            success: true,
            message: 'Menu edited successfully'
        });
        return
    } catch (error) {
        console.log("editMenu Erro", error);
        res.status(500).json({ message: "Internal server error" });
        return
    }
}