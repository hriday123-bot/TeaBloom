import { useState, useEffect } from "react"
import { Table, Form, Button, Row, Col, Card, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredential } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  console.log('checking orders', orders);


  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

  }, [userInfo, userInfo.name, userInfo.email]);


  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredential(res));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <Card className="my-3 p-4 shadow-lg rounded bg-light">
          <h3>User Profile</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className="my-2">
              <Form.Label className="text-primary">Name</Form.Label>
              <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='email' className="my-2">
              <Form.Label className="text-primary">Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='password' className="my-2">
              <Form.Label className="text-primary">Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='confirmPassword' className="my-2">
              <Form.Label className="text-primary">Confirm Password</Form.Label>
              <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button type='submit' variant='primary' className="my-2">Update</Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Card>
      </Col>
      <Col md={9}>
        <Card className="my-3 p-4 shadow-lg rounded bg-light">
          <h3>My Orders</h3>
          {isLoading ? <Loader /> : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) :
            (
              <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>Rs {order.totalPrice}</td>
                      <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes style={{ color: 'red' }} />)}</td>
                      <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<FaTimes style={{ color: 'red' }} />)}</td>
                      <td>
                        <Button
                          as={Link}
                          to={`/order/${order._id}`}
                          className='btn-sm'
                          variant='light'
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Card>
      </Col>

    </Row>
  )
}

export default ProfileScreen