import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
//import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Aboutus from './screens/Aboutus';
import Feedback from './screens/Feedback';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    ctxDispatch({ type: 'CART_RESET' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
      style={{
        backgroundColor: '#90EE90',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar style={{backgroundColor:'#004225'}}  variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    src="/images/logo.png"
                    alt=""
                    style={{ width: '100px', height: 'auto' }}
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox style={{ textAlign: 'center' }} />
                <Nav className="me-auto  w-100  justify-content-end">
                {userInfo && userInfo.isAdmin && (
                     <>
                     <LinkContainer to="/admin/dashboard">
                       <Nav.Link style={{ marginRight: '5px', color: '#fff' }}>dashboard</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to="/admin/products">
                       <Nav.Link style={{ marginRight: '5px', color: '#fff' }}>Medicine</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to="/admin/orders">
                       <Nav.Link style={{ marginRight: '5px', color: '#fff' }}>Orders</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to="/admin/users">
                       <Nav.Link style={{ marginRight: '5px', color: '#fff' }}>Users</Nav.Link>
                     </LinkContainer>
                   </>
                  )}
                  <Link to="/cart" className="nav-link">
                    <span style={{ marginRight: '5px', color: '#fff' }}>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                 <NavDropdown
                 title={
                   <>
                     <FontAwesomeIcon
                       icon={faUser}
                       style={{ marginRight: '5px', color: '#ffffff', fontSize: '20px' }}
                     />{' '}
                   </>
                 }
                 id="basic-nav-dropdown"
                 style={{
                  color:'#fff',
                   borderRadius: '5px',
                   boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                 }}
               >
               
                 {/* User Profile */}
                 <LinkContainer to="/profile">
                   <NavDropdown.Item style={{ color: '#fff', fontWeight: 'bold' }}>
                     User Profile
                   </NavDropdown.Item>
                 </LinkContainer>
               
                 {/* Order History */}
                 <LinkContainer to="/orderhistory">
                   <NavDropdown.Item style={{ color: '#fff', fontWeight: 'bold' }}>
                     Order History
                   </NavDropdown.Item>
                 </LinkContainer>
               
                 {/* About Us */}
                 <LinkContainer to="/aboutus">
                   <NavDropdown.Item style={{ color: '#fff', fontWeight: 'bold' }}>
                     About Us
                   </NavDropdown.Item>
                 </LinkContainer>
               
                 {/* Contact Us */}
                 <LinkContainer to="/feedback">
                   <NavDropdown.Item style={{ color: '#fff', fontWeight: 'bold' }}>
                     Contact Us
                   </NavDropdown.Item>
                 </LinkContainer>
               
                 <NavDropdown.Divider />
                 <Link
                   className="dropdown-item"
                   to="#signout"
                   onClick={signoutHandler}
                   style={{ color: '#e74c3c', fontWeight: 'bold' }}
                 >
                   Sign Out
                 </Link>
               </NavDropdown>
               
                  ) : (
                    <Link className="nav-link" to="/signin" style={{ color: '#ffffff' }}>
                    Sign In
                  </Link>
                  )}
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/Feedback"
                element={<Feedback />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
