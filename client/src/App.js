import { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderInfoScreen from './screens/OrderInfoScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import PendingScreen from './screens/PendingScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import { Store } from './Store';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cart');
    localStorage.removeItem('orderInformation');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar expand="xxl" className="navbar navbar-custom">
            <Container fluid="xxl">
              <Navbar.Brand href="/">eBruin</Navbar.Brand>
              <Nav className="ms-auto">
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id="basic-nav-dropdown"
                    className="custom-dropdown"
                  >
                    <NavDropdown.Item href="/myProfile">
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="editProfile">
                      User Profile Update
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/pending">
                      Pending Order
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/orderhistory">
                      Order History
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="/"
                      className="dropdown-item"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link className="nav-link" href="/signin">
                    Sign In
                  </Nav.Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container fluid="md">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/myProfile" element={<ProfileScreen />} />
              <Route path="/OrderInfo" element={<OrderInfoScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/orders/:id" element={<OrderScreen />} />
              <Route path="/pending" element={<PendingScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">Copyright 2023 All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
