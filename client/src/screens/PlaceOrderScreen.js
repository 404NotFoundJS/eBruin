import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Information</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.orderInformation.fullName}
                <br />
                <strong>Phone Number:</strong>
                {cart.orderInformation.phoneNumber}
                <br />
                <strong>Email:</strong>
                {cart.orderInformation.contactEmail}
                <br />
                <strong>Zip Code:</strong>
                {cart.orderInformation.zipCode}
                <br />
              </Card.Text>
              <Link to="/orderInfo">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
