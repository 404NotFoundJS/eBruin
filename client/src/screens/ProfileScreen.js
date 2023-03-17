import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { getUserDetails } from '../actions/userActions';
import ListingTable from '../components/ListingTable';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import OrderHistory from '../components/OrderHistory';
import ProfileCard from '../components/ProfileCard';
import ReviewTable from '../components/ReviewTable';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: userLoading,
    error: userError,
    userInfo: userData,
  } = userDetails;
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const productList = useSelector((state) => state.productList);
  const {
    error: productError,
    loading: productLoading,
    products,
    noMatch,
    page,
    pages,
  } = productList;
  useEffect(() => {
    if (!userInfo) {
      return navigate('/signin');
    }
    dispatch(getUserDetails(userInfo._id));
    dispatch(listProducts({ sellerId: userInfo._id, pageNumber: pageNumber }));
  }, [dispatch, navigate, userInfo, pageNumber]);

  return userLoading ? (
    <LoadingBox></LoadingBox>
  ) : userError ? (
    <MessageBox variant="danger">{userError}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{userData.name}</title>
      </Helmet>
      <h1 className="my-3">My Profile</h1>
      <Row>
        <Col>
          <ProfileCard userDetails={userData}></ProfileCard>
        </Col>
        <Col xs={8}>
          {productLoading ? (
            <LoadingBox></LoadingBox>
          ) : productError ? (
            <MessageBox variant="danger">{productError}</MessageBox>
          ) : (
            <Card>
              <Card.Header>
                <Tabs
                  defaultActiveKey="listings"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="listings" title="Listings">
                    <ListingTable
                      listings={products}
                      noMatch={noMatch}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalPages={pages}
                    />
                  </Tab>
                  <Tab eventKey="orderHistory" title="Order History">
                    <OrderHistory></OrderHistory>
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <ReviewTable></ReviewTable>
                  </Tab>
                </Tabs>
              </Card.Header>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}
