import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import ItemPagination from '../components/ItemPagination';

function SearchScreen() {
  const dispatch = useDispatch();
  const { keyword = '', pageNumber = 1 } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, noMatch, pages } = productList;

  useEffect(() => {
    dispatch(listProducts({ keyword: keyword, pageNumber: pageNumber }));
  }, [dispatch, keyword, pageNumber]);
  return (
    <div>
      <Helmet>
        <title>eBruin</title>
      </Helmet>
      <Row>
        <h1>Search Results for "{keyword}":</h1>
      </Row>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Container fluid>
            {noMatch ? (
              <h2>No match found</h2>
            ) : (
              products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))
            )}
          </Container>
        )}
      </div>
      <br />
      <Container style={{ position: 'absolute', bottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ItemPagination
            page={parseInt(pageNumber)}
            pages={parseInt(pages)}
            keyword={''}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <h6>{products.length} Listings Found</h6>
          )}
        </div>
      </Container>
    </div>
  );
}
export default SearchScreen;
