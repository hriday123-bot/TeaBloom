import {Navbar,Nav,Container} from 'react-bootstrap';
import {FaShoppingCart,FaUser,FaCoffee,FaLeaf} from 'react-icons/fa';


const Header=()=>{
    return (
        <header>
            <Navbar style={{backgroundColor:'blue'}} variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">
                        <FaCoffee style={{marginRight:'8px'}}/>
                        TeaNest
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart" ><FaShoppingCart /> Cart</Nav.Link>
                            <Nav.Link href="/login" ><FaUser /> Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;