import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderConfirmScreen from './screens/OrderConfirmScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PendingScreen from './screens/PendingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import UploadScreen from './screens/UploadScreen';
import EditProfileScreen from './screens/EditProfileScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('orderInfo');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar expand="xxl" className="navbar navbar-custom">
            <Container fluid="xxl">
              <Navbar.Brand href="/">eBruin</Navbar.Brand>
              <SearchBar />
              <Nav className="ms-auto">
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Link>
                <Link to="/upload" className="nav-link">
                  <i className="fas fa-plus-circle fa-lg upload-icon"></i>
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
              <Route path="/pageNumber/:pageNumber" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route
                path="/search/keyword/:keyword/pageNumber/:pageNumber"
                element={<SearchScreen />}
              />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/upload" element={<UploadScreen />} />
              <Route path="/myProfile" element={<ProfileScreen />} />
              <Route path="/OrderInfo" element={<OrderConfirmScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/orders/:id" element={<OrderScreen />} />
              <Route path="/pending" element={<PendingScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/editProfile" element={<EditProfileScreen />} />
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
