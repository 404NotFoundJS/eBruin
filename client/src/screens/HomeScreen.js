import { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, noMatch } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div>
      <Helmet>
        <title>eBruin</title>
      </Helmet>
      <h1>All Listings</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {noMatch ? (
              <h1>No match found</h1>
            ) : (
              products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))
            )}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
