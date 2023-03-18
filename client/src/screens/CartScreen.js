import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success } = orderCreate;

  const updateCartHandler = async (item, qty) => {
    dispatch(addToCart(item._id, qty));
  };

  const removeItemHandler = async (item) => {
    dispatch(removeFromCart(item._id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/signin');
    } else {
      dispatch(createOrder(cartItems));
    }
  };

  useEffect(() => {
    if (success) {
      navigate('/OrderInfo');
    }
  }, [success, navigate]);

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              You don't have any items in your cart.{' '}
              <Link to="/">Start Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={`${item.image}`}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail cart-img"
                      ></img>{' '}
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.qty === 1}
                        onClick={() => updateCartHandler(item, -1)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.qty}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() => updateCartHandler(item, 1)}
                        disabled={item.qty === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Confirm Order
                    </Button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)} items):
                    ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </h3>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          {loading && <MessageBox variant="info">Loading...</MessageBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </Col>
      </Row>
    </div>
  );
}
