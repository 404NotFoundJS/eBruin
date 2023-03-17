import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';
import multer from 'multer';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts,createdUsers });
});

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../client/public/uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

seedRouter.post('/upload', upload.single('productImage'), (req, res) => {
    // Return the filename of the uploaded file to the frontend
    res.json({ filename: req.file.filename });
  });

seedRouter.post(
    '/upload-product', 
    upload.single('productImage'),
    expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
        name: req.body.name,
        slug: req.body.slug,
        productImage: req.file.originalname,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
        });
        const product = await newProduct.save();
        res.send(product);
    })
);


export default seedRouter;