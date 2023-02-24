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

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
