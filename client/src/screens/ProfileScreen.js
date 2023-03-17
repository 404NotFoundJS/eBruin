import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import ListingTable from '../components/ListingTable';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error } = userDetails;
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  useEffect(() => {
    if (!userInfo) {
      return navigate('/signin');
    }
    if (!userInfo.reviews) {
      dispatch(getUserDetails(userInfo._id));
    }
    // if (userInfo.reviews) {
    //   setAvgRating(
    //     userInfo.reviews.reduce((a, c) => a + c.rating, 0) /
    //       userInfo.reviews.length
    //   );
    // } else {
    //   setAvgRating(0);
    //   setNumReviews(0);
    // }
  }, [dispatch, navigate, userInfo]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{userInfo.name}</title>
      </Helmet>
      <h1 className="my-3">My Profile</h1>
      <Row>
        <Col>
          {/* <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{userInfo.name}</Card.Title>
              <Card.Text>{userInfo.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Rating rating={avgRating} numReviews={numReviews}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
              </ListGroup.Item>
              <ListGroup.Item>Phone: {userInfo.phone}</ListGroup.Item>
            </ListGroup>
          </Card> */}
          <ProfileCard userDetails={userInfo}></ProfileCard>
        </Col>
        <Col xs={8}>
          <Card>
            <Card.Header>
              <Tabs
                defaultActiveKey="listings"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="listings" title="Listings">
                  <ListingTable listings={userInfo.listings}></ListingTable>
                </Tab>
                <Tab eventKey="orderHistory" title="Order History">
                  <Row>userInfo Order History</Row>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Row>userInfo Reviews</Row>
                </Tab>
              </Tabs>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
