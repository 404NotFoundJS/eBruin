import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import multer from 'multer';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search || '';

    const searchFilter = search
      ? {
          status: 'available',
          $or: [{ name: search }, { description: search }],
        }
      : { status: 'available' };

    try {
      const products = await Product.find(searchFilter)
        .sort({ updatedAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);
      if (products.length > 0) {
        const count = products.length;
        res.send({ products, page, pages: Math.ceil(count / pageSize) });
      } else {
        res.send({ noMatch: 'No match found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
productRouter.get(
  '/slug/:slug',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller');
    if (product && product.status === 'available') {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, '../client/public/uploads/');
  },
  filename: (req, file, callback) => {
      callback(null, file.originalname);
  }
})

const upload = multer({ storage: storage });

// productRouter.post('/upload', upload.single('productImage'), (req, res) => {
//   // Return the filename of the uploaded file to the frontend
//   res.json({ filename: req.file.filename });
// });

productRouter.post(
  '/upload-product', 
  upload.single('productImage'),
  expressAsyncHandler(async (req, res) => {
      const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      productImage: req.file.originalname,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      seller: req.body.seller
      });
      const product = await newProduct.save();
      res.send(product);
  })
);

export default productRouter;
