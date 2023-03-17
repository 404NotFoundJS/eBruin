import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createReview } from '../actions/reviewActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ReviewUserScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { loading, error, success, review } = reviewCreate;
  const { userInfo } = useSelector((state) => state.userSignin);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id, orderId } = useParams();
  console.log(id, 'id');
  console.log(orderId, 'orderId');

  const StyledRating = styled(Rating)({
    name: 'hover-feedback',
    color: '#ff6d75',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(id, orderId, {
        reviewer: userInfo._id,
        target: id,
        order: orderId,
        rating: rating,
        comment: comment,
      })
    );
    navigate(`/myProfile/`);
  };

  useEffect(() => {
    if (success) {
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    }
  }, [success]);

  return (
    <div>
      <Helmet>
        <title>Review User</title>
      </Helmet>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="rating" className="mb-3">
          <Typography component="legend">Your Rating For the Seller</Typography>
          <StyledRating
            name="customized-color"
            size="large"
            value={rating}
            onChange={(event, rating) => {
              setRating(rating);
            }}
          />
        </Form.Group>

        <Form.Group controlId="comment">
          <Form.Label>Comment(optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            maxLength={200}
            placeholder="Please enter your comment here. 200 characters max"
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </Form>
    </div>
  );
}
