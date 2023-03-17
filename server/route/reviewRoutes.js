import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import { isAuth } from '../utils.js';

const reviewRouter = express.Router();

reviewRouter.post(
  '/:userId/:orderId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const review = new Review({
        reviewer: req.body.reviewer,
        target: req.params.userId,
        order: req.params.orderId,
        rating: req.body.rating,
        comment: req.body.comment,
      });
      const createdReview = await review.save();
      res.send({ message: 'Review Created', review: createdReview });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

reviewRouter.get(
  '/:userId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const reviews = await Review.find({ target: req.params.userId });
      res.send(reviews);
    } catch (error) {
      res.status(500).send({ message: "Couldn't get reviews" });
    }
  })
);

export default reviewRouter;
