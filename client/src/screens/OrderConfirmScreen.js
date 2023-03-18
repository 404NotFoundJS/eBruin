import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderConfirmScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, orders, cartItems } = orderCreate;

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order Information</title>
      </Helmet>
      {orders && (
        <ListGroup>
          <ListGroup.Item>
            <Row className="align-items-center">
              <Col md={2}>
                <h2>Product</h2>
              </Col>
              <Col md={3}>
                <h2>Quantity</h2>
              </Col>
              <Col md={3}>
                <h2>Price</h2>
              </Col>
              <Col md={2}>
                <h2>Subtotal</h2>
              </Col>
              <Col md={2}>
                <h2>Contact Seller</h2>
              </Col>
            </Row>
          </ListGroup.Item>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={2}>
                  <img
                    src={`${item.image}`}
                    alt={item.name}
                    className="img-fluid rounded img-thumbnail cart-img"
                  ></img>{' '}
                  <div>{item.name}</div>
                </Col>
                <Col md={3}>
                  <span>{item.qty}</span>{' '}
                </Col>
                <Col md={3}>${item.price}</Col>
                <Col md={2}>${item.qty * item.price}</Col>
                <Col md={2}>
                  <a href={`mailto:${item.seller.email}`}>
                    {item.seller.email}
                  </a>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Link to="/" className="btn btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}
