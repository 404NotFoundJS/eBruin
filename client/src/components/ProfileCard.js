import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Rating from './Rating';

export default function ProfileCard({ userDetails }) {
  const [avgRating, setAvgRating] = useState();
  const [numReviews, setNumReviews] = useState();
  const { name, description, reviews, email, phone } = userDetails;
  useEffect(() => {
    if (reviews) {
      setAvgRating(reviews.reduce((a, c) => a + c.rating, 0) / reviews.length);
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
          <Rating rating={avgRating} numReviews={numReviews}></Rating>
        </ListGroup.Item>
        <ListGroup.Item>
          <a href={`mailto:${email}`}>{email}</a>
        </ListGroup.Item>
        <ListGroup.Item>Phone: {phone}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
