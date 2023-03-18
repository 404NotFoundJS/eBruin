import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ProfileCard({ userDetails }) {
  const [avgRating, setAvgRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const { name, description, email, phone } = userDetails;
  const { reviews } = useSelector((state) => state.reviewList);
  useEffect(() => {
    if (reviews) {
      setAvgRating(reviews.reduce((a, c) => a + c.rating, 0) / reviews.length);
      setNumReviews(reviews.length);
    } else {
      setAvgRating(0);
      setNumReviews(0);
    }
  }, [reviews]);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Typography component="legend">
            Based on {numReviews} reviews:{' '}
          </Typography>
          <Rating name="read-only" precision={0.1} value={avgRating} readOnly />
        </ListGroup.Item>
        <ListGroup.Item>
          <a href={`mailto:${email}`}>{email}</a>
        </ListGroup.Item>
        <ListGroup.Item>Phone: {phone}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
