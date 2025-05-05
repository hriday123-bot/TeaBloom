import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaCoffee, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';


const Header = () => {
    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            console.log('Logout Success');

            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <header className='header-container'>
            <Navbar className="custom-navbar" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/" className='navbar-brand'>
                        <FaCoffee className="icon-coffee" />
                        TeaNest
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navbar-links">
                            <Nav.Link as={Link} to="/cart" className='nav-link' ><FaShoppingCart className='icon-cart' />
                                Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' className='cart-badge'>
                                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                            {userInfo ?
                                (<NavDropdown title={userInfo.name} id='username' drop="down" className="user-dropdown">
                                    <NavDropdown.Item as={Link} to='/profile'>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/logout' onClick={logoutHandler}>
                                        LogOut
                                    </NavDropdown.Item>
                                </NavDropdown>)
                                : (<Nav.Link as={Link} to="/login" className='icon-user'><FaUser /> Log In</Nav.Link>)}
                            {userInfo && userInfo.isAdmin && 
                            ( 
                                <NavDropdown title='Admin' id='adminmenu' drop="down" className="admin-dropdown">
                                    <NavDropdown.Item as={Link} to='/admin/productlist'>
                                        Tea
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/orderlist'>
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/userlist'>
                                        Users
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;