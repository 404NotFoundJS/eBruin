import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
//import seedRouter from './route/seedRoutes.js';
import productRouter from './route/productRoutes.js';
import userRouter from './route/userRoutes.js';
import orderRouter from './route/orderRoutes.js';
import reviewRouter from './route/reviewRoutes.js';

//const express = require('express');
//const bodyParser = require('body-parser');
//const connectDB = require('./config/db');
//const { default: data } = require('./data.js');
dotenv.config();
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://eBruin:eBruin@cluster0.ehynfvc.mongodb.net/eBruin?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
