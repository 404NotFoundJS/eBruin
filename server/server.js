import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from "./route/seedRoutes.js";
import productRouter from "./route/productRoutes.js";
//const express = require('express');
//const bodyParser = require('body-parser');
//const connectDB = require('./config/db');
//const { default: data } = require('./data.js');
dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).
then(()=>{console.log('Connected to MongoDB')}).catch(err =>{console.log(err.message)});

const app = express();
app.use('/api/seed',seedRouter);
app.use('/api/products', productRouter)
//connectDB();

const port = process.env.PORT || 4000;




app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
