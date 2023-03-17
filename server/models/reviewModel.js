import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Order',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
