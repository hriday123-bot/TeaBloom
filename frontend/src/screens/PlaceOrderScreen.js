import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/orderApiSlice'
import { clearCartItems } from '../slices/cartSlice'

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate('/shipping');
    } else if (!cart.shippingAddress) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log('order details',res);
      
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <Card className='card-container'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city}  {' '}
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>

              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Payment Method</h5>
                <strong>Method:</strong> {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Order Items</h6>
                {cart.cartItems.length === 0 ?
                  (<Message>Your cart is empty</Message>) :
                  (
                    <ListGroup variant='flush'>
                      {cart.cartItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col >
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {item.price} = {item.qty * item.price} Rs
                            </Col>
                          </Row>
                        </ListGroupItem>

                      ))}
                    </ListGroup>
                  )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='card-container'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    {cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                  <strong>Total:</strong>
                  </Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error.message}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button'
                  className='btn-block'
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>

            </ListGroup>
          </Card>

        </Col>
      </Row>

    </>
  )
}

export default PlaceOrderScreen;