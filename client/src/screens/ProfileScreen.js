import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { Store } from '../Store';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function ProfileScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [avgRating, setAvgRating] = useState();
  const [numReviews, setNumReviews] = useState();
  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    loading: true,
    user: {},
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${userInfo._id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    if (!userInfo) {
      return navigate('/signin');
    }
    fetchUser();
    if (user.reviews) {
      setAvgRating(
        user.reviews.reduce((a, c) => a + c.rating, 0) / user.reviews.length
      );
    } else {
      setAvgRating(0);
      setNumReviews(0);
    }
  }, [dispatch, userInfo, navigate]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{user.name}</title>
      </Helmet>
      <h1 className="my-3">My Profile</h1>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Rating rating={avgRating} numReviews={numReviews}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </ListGroup.Item>
              <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col xs={8}>
          <Card>
            <Card.Header>
              <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="listings" title="Listings">
                  <Row>User Listings</Row>
                </Tab>
                <Tab eventKey="orderHistory" title="Order History">
                  <Row>User Order History</Row>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Row>User Reviews</Row>
                </Tab>
              </Tabs>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
