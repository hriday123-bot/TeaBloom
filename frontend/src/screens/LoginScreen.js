import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredential } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredential({ ...res, }));
            navigate(redirect);

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <FormContainer>
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2" disabled={isLoading}>
                    Log In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col className='text-center'>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >Sign Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
