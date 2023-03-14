import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: String,
    required: true,
  },

  target: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
