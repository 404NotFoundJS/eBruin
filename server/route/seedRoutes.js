import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts,createdUsers });
});

seedRouter.post(
    '/upload-product', 
    expressAsyncHandler(async (req, res) => {
        let newProduct = new Product({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
        });
        let product = await newProduct.save()
        res.send(product);
    })
);

export default seedRouter;