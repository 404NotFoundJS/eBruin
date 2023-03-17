import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();

  const addToCartHandler = async (item) => {
    dispatch(addToCart(item._id, 1));
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <img
          src={`${product.productImage}`}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="danger" disabled>
            Unavailable
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
