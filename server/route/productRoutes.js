import escapeStringRegexp from 'escape-string-regexp';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import multer from 'multer';
import cloudinary from '../cloudinary.js';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = decodeURIComponent(req.query.keyword || '');
    const keywordRegex = new RegExp(escapeStringRegexp(keyword), 'gi');
    const sellerId = req.query.sellerId || '';

    const searchFilter = keyword
      ? {
          status: 'available',
          $or: [{ name: keywordRegex }, { description: keywordRegex }],
        }
      : sellerId
      ? { seller: sellerId }
      : { status: 'available' };

    try {
      const count = await Product.count(searchFilter);
      const products = await Product.find(searchFilter)
        .sort({ updatedAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);
      if (products.length > 0) {
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
  },
});

const upload = multer({ storage: storage });

// productRouter.post('/upload', upload.single('productImage'), (req, res) => {
//   // Return the filename of the uploaded file to the frontend
//   res.json({ filename: req.file.filename });
// });

productRouter.post(
  '/upload-product',
  upload.single('productImage'),
  expressAsyncHandler(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'products',
    });
    console.log(result);
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      productImage: result.secure_url,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      seller: req.body.seller,
    });
    const product = await newProduct.save();
    res.send(product);
  })
);

function extractPublicId(url) {
  const startIndex = url.indexOf('products/');
  const endIndex = url.lastIndexOf('.');
  return url.substring(startIndex, endIndex);
}

productRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product && product.seller === req.user._id) {
      await cloudinary.uploader.destroy(extractPublicId(product.productImage));
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
