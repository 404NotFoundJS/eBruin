import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function OrderInfoScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { orderInformation },
  } = state;
  const [fullName, setFullName] = useState(orderInformation.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(
    orderInformation.phoneNumber || ''
  );
  const [contactEmail, setContactEmail] = useState(
    orderInformation.contactEmail || ''
  );
  const [zipCode, setZipCode] = useState(orderInformation.zipCode || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/OrderInfo');
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_ORDER_INFORMATION',
      payload: {
        fullName,
        phoneNumber,
        contactEmail,
        zipCode,
      },
    });
    localStorage.setItem(
      'orderInformation',
      JSON.stringify({
        fullName,
        phoneNumber,
        contactEmail,
        zipCode,
      })
    );
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
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
