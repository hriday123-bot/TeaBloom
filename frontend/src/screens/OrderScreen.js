import { Link, useParams } from 'react-router-dom';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Button,
} from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/orderApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { userInfo } = useSelector((state) => state.auth);

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    useEffect(() => {

        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            if (paypal.clientId) {

                const loadPayPalScript = async () => {
                    console.log('Attempting to load PayPal script...');

                    paypalDispatch({
                        type: "resetOptions",
                        value: {
                            'client-id': paypal.clientId,
                            currency: "USD",
                        },
                    });
                    paypalDispatch({ type: "setLoadingStatus", value: "pending" });
                }
                if (order && !order.isPaid) {
                    console.log('Order exists and is not paid, checking PayPal script');
                    if (!window.paypal) {
                        loadPayPalScript();
                    } else {
                        console.error('paypal not loaded');

                    }

                }
            }
        }

    }, [order, paypal, loadingPayPal, paypalDispatch, errorPayPal]);

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            console.log('Order approved:', details);
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment Successful');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
        )
    }
    const onApproveTest = async() => {
        await payOrder({ orderId, details:{payer:{}} });
        refetch();
        toast.success('Payment Successful');
    }

    const onError = (error) => {
        toast.error(error.message);
    }
    const createOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
     }

    return isLoading ? (<Loader />) : error ? (<Message variant='danger' />) :
        (<>
            <h3 >Order {order._id}</h3>
            <Row>
                <Col md={8}>
                    <Card className='card-container'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Shipping</h3>
                                <p>
                                    <strong>Name:</strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{order.user.email}

                                </p>
                                <p>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>
                                        Paid on {order.paidAt}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>Your order is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            src={`/${item.image}`}
                                                            alt={item.name}
                                                            fluid rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/data/${item.data}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x Rs {item.price} = Rs {' '}
                                                        {(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

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
                                    <Col>Items</Col>
                                    <Col>Rs {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        {order.shippingPrice === 0 ? (
                                            <div style={{color:'green'}}>FREE</div>
                                        ) : (
                                            `Rs ${order.shippingPrice}`
                                        )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>GST</Col>
                                    <Col>Rs {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {isPending ? (
                                        <Loader />
                                    ) : (
                                        <div>
                                            {/* <Button
                                                style={{ marginBottom: '10px' }}
                                                onClick={onApproveTest}
                                            >
                                                Test Pay Order
                                            </Button> */}

                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
        )
}
export default OrderScreen;