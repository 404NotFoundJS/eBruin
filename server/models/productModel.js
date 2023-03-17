import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, required: true, default: 'available' },
    productImage: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('validate', function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

const Product = mongoose.model('Product', productSchema);
export default Product;
