import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import ItemPagination from '../components/ItemPagination';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

function HomeScreen() {
  const dispatch = useDispatch();
  const { pageNumber = 1 } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, noMatch, pages } = productList;

  useEffect(() => {
    dispatch(listProducts({ pageNumber: pageNumber }));
  }, [dispatch, pageNumber]);
  return (
    <div>
      <Helmet>
        <title>eBruin</title>
      </Helmet>
      <h1>All Listings</h1>
      {noMatch ? (
        <MessageBox>Wow, no listings!?</MessageBox>
      ) : (
        <>
          <div className="products">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {noMatch && <MessageBox>No Product Found</MessageBox>}
                <Container fluid>
                  <Row>
                    {products.map((product) => (
                      <Col
                        key={product.slug}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-3"
                      >
                        <Product product={product}></Product>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </>
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
        </>
      )}
    </div>
  );
}
export default HomeScreen;
