import { Link,useNavigate } from "react-router-dom";
import { Row,Col,ListGroup,Image,Form,Button,Card } from "react-bootstrap";
import { FaTrash,FaLeaf } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch,useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../slices/cartSlice";


const CartScreen = () => {
     const navigate=useNavigate();
     const dispatch=useDispatch();

     const cart=useSelector(state=>state.cart);
     const {cartItems}=cart;

     const addToCartHandler=async (item,qty)=>{
        dispatch(addToCart({...item,qty}));
     }

     const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
     }

     const checkoutHandler=()=>{
        navigate('/login?redirect=/shipping')
     }

     return(
        <>
          <Row>
            <Col md={8}>
               <h3 style={{marginBottom: '10px'}}>Shopping Cart</h3>
               {cartItems.length=== 0?(
                <div style={{ marginTop: '20px', width: 'auto' }}>
                <Message variant="info">Your TeaBloom Cart is <strong>Empty</strong>. Go to <Link to="/">Shop</Link> to buy Tea <FaLeaf/></Message>
                </div>
               ):(
                     <ListGroup variant='flush'>
                          {cartItems.map(item=>(
                            <ListGroup.Item key={item._id}>
                                 <Row>
                                      <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                      </Col>
                                      <Col md={3}>
                                        <Link to={`/data/${item._id}`}>{item.name}</Link>
                                      </Col>
                                      <Col md={2}>
                                        Rs: {item.price}
                                      </Col>
                                      <Col md={2}>
                                           <Form.Control as='select' value={item.qty} onChange={(e)=>addToCartHandler(item,Number(e.target.value))}>
                                                        {[...Array(item.countInStock).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))}
                                            </Form.Control>
                                         
                                      </Col>
                                      <Col md={2}>
                                        <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item._id)}>
                                            <FaTrash />
                                        </Button>
                                      </Col>
                                 </Row>
                            </ListGroup.Item>
                          ))}
                     </ListGroup>
               )}
            </Col>
            <Col md={4}>
               <Card style={{marginTop: '40px'}}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h5>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h5>
                          Rs: {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <Button 
                            type='button' 
                            className='checkout-button' 
                            disabled={cartItems.length===0} 
                            onClick={()=>{checkoutHandler()}}>
                                Proceed to Checkout
                            </Button>   
                      </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>

          </Row>

        </>
     )
};

export default CartScreen;