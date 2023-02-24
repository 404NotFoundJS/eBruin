import express from 'express';
import data from './data.js';
//const express = require('express');
//const bodyParser = require('body-parser');
//const connectDB = require('./config/db');
//const { default: data } = require('./data.js');

const app = express();

//connectDB();

const port = process.env.PORT || 4000;

app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
