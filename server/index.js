import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './src/database/db.js';
import cors from 'cors';

import Authrouter  from "./src/routes/user.route.js";
import productRouter from './src/routes/product.router.js';
import OrderRouter from './src/routes/order.routes.js';
import CartRouter from "./src/routes/cart.routes.js";
import ContactRouter from './src/routes/contact.router.js';
import cookieParser from 'cookie-parser';



dotenv.config({ path: './.env' });

const app = express();

const PORT = process.env.PORT ;
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));




app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/auth', Authrouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', OrderRouter);
app.use('/api/v1/cart', CartRouter);
app.use('/api/v1/contact', ContactRouter);

// Connect to the database
ConnectDB();

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})