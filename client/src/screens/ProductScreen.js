import { useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { deleteProduct, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProfileCard from '../components/ProfileCard';
import Rating from '../components/Rating';

function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id: productId } = params;
  const productDetails = useSelector((state) => state.productDetails);
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = async () => {
    dispatch(addToCart(productId, 1));
    navigate('/cart');
  };

  const deleteHandler = async () => {
    dispatch(deleteProduct(productId));
    navigate('/myProfile');
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large product-img"
            src={`${product.productImage}`}
            alt={product.name}
          ></img>
        </Col>
        <Col className="ms-auto">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <ProfileCard userDetails={product.seller} />
          )}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    Status:
                    {product.countInStock > 0 &&
                    product.status === 'available' ? (
                      <>
                        <Badge bg="success">Available</Badge>
                        <Badge bg="danger">{product.countInStock} left</Badge>
                      </>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
                {(product.seller === userInfo._id) && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={deleteHandler} variant="primary">
                        Delete product
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;
