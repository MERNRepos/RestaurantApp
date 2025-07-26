import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route';
import restaurantRoute from './routes/restautant.route';
import menuRoute from './routes/menu.route';
import orderRoute from './routes/order.route';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DIRNAME = path.resolve();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/restaurant', restaurantRoute);
app.use('/api/v1/menu', menuRoute);
app.use('/api/v1/order', orderRoute);

// Static frontend
app.use(express.static(path.resolve(DIRNAME, "client", "dist")));

// Correct wildcard for SPA fallback (no "*")
// app.get("/*", (_req, res) => {
//     res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
// });

app.listen(PORT, () => {
    connectDB();
    console.log("App is listening on port", PORT);
});
