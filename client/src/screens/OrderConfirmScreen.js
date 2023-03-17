import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function OrderConfirmScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const orderInfo = useSelector((state) => state.cart.orderInfo);
  const [fullName, setFullName] = useState(orderInfo.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(orderInfo.phoneNumber || '');
  const [contactEmail, setContactEmail] = useState(
    orderInfo.contactEmail || ''
  );
  const [zipCode, setZipCode] = useState(orderInfo.zipCode || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/OrderInfo');
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/placeorder');
  };
  return (
    <div>
      <Helmet>
        <title>Order Information</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Order Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactEmail">
            <Form.Label>Contact Email</Form.Label>
            <Form.Control
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Confirm Order
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
