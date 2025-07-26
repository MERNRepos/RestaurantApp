import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: 'sagathiatejas', // optional, based on your URI
        });
        console.log("mongo connected");
    } catch (error) {
        console.log("connectDB Error==>", JSON.stringify(error));
        process.exit(1); // stop the app if DB connection fails
    }
}

export default connectDB