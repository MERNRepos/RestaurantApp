import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";

const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        console.log("req.body", JSON.stringify(req.body));

        const restaurant = await Restaurant.findOne({ user: req.id });
        const file = req.file;

        if (restaurant) {
            res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            });
            return
        }
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is required"
            })
            return
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });
        res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });
        return
    } catch (error) {
        console.log("create restaurant error", error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const getRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found"
            });
            return
        };
        res.status(200).json({ success: true, restaurant });
        return
    } catch (error) {
        console.log("getRestaurant error", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        });
        return
    } catch (error) {
        console.log("updateRestaurant error", error);
        res.status(500).json({ message: "Internal server error" })
        return
    }
}

const getRestaurantOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return
        };
        const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        res.status(200).json({
            success: true,
            orders
        });
        return
    } catch (error) {
        console.log("getRestaurantOrder error", error);
        res.status(500).json({ message: "Internal server error" })
        return
    }
}

const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not found"
            })
            return
        }
        order.status = status;
        await order.save();
        res.status(200).json({
            success: true,
            status: order.status,
            message: "Status updated"
        });
        return
    } catch (error) {
        console.log("updateOrderStatus error", error);
        res.status(500).json({ message: "Internal server error" });
        return
    }
}

const searchRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split("").filter((cuisine) => cuisine);
        const query: any = {};

        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: "i" } },
                { city: { $regex: searchText, $options: "i" } },
                { country: { $regex: searchText, $options: "i" } }
            ]
        }

        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: "i" } },
                { cuisines: { $regex: searchQuery, $options: "i" } }
            ];
        }

        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines }
        }
        const restaurants = await Restaurant.find(query);
        res.status(200).json({
            success: true,
            data: restaurants
        });
        return
    } catch (error) {
        console.log("searchRestaurant error", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getSingleRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 }
        });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return
        };
        res.status(200).json({ success: true, restaurant });
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
        return
    }
}

export {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    getRestaurantOrder,
    updateOrderStatus,
    searchRestaurant,
    getSingleRestaurant
}