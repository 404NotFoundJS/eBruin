import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) {
    navigate('/signin?redirect=/placeorder');
  }

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const placeOrderHandler = async () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    // try {
    //   dispatch({ type: 'CREATE_REQUEST' });
    //   const { data } = await axios.post(
    //     '/api/orders',
    //     {
    //       orderItems: cartItems,
    //       orderInfo: cart.orderInfo,
    //       itemsPrice: cart.itemsPrice,
    //       taxPrice: cart.taxPrice,
    //       totalPrice: cart.totalPrice,
    //     },
    //     {
    //       headers: {
    //         authorization: `Bearer ${userInfo.token}`,
    //       },
    //     }
    //   );
    //   dispatch({ type: CART_EMPTY });
    //   dispatch({ type: 'CREATE_SUCCESS' });
    //   localStorage.removeItem('cartItems');
    //   navigate(`/orders/${data.order._id}`);
    // } catch (err) {
    //   dispatch({ type: 'CREATE_FAIL' });
    //   toast.error(getError(err));
    // }
  };
  if (success) {
    navigate(`/orders/${order._id}`);
    dispatch({ type: ORDER_CREATE_RESET });
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
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
                <strong>Name:</strong> {cart.orderInfo.fullName}
                <br />
                <strong>Phone Number:</strong>
                {cart.orderInfo.phoneNumber}
                <br />
                <strong>Email:</strong>
                {cart.orderInfo.contactEmail}
                <br />
                <strong>Zip Code:</strong>
                {cart.orderInfo.zipCode}
                <br />
              </Card.Text>
              <Link to="/OrderInfo">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Location:</strong> {'UCLA'}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thmbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
