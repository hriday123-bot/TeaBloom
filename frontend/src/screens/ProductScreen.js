import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {Form,Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetDataByIdQuery } from "../slices/dataApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
    const {id:getId}=useParams();
    const [qty,setQty]=useState(1);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    

    const {data:product,isLoading,error}=useGetDataByIdQuery(getId);
    
    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}));
        navigate(`/cart`);
    }

    return (
        <>
           {isLoading? (<Loader/>):error ? 
             <Message variant='danger'>
                {error?.data?.message || error.error}
             </Message>
           :(
            <>
                <Link className='btn btn-light my-3' to='/'> Go Back
                </Link>
                <Row>
                    <Col md={5}>
                        <Image src={`/${product.image}`} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numberOfReviews} reviews`} />
                                    </ListGroup.Item> 
                                    <ListGroup.Item>
                                        category: {product.category}
                                    </ListGroup.Item>    
                                    <ListGroup.Item className="description">
                                    {product.description}
                                    </ListGroup.Item>     
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>{product.price} ₨</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock>0 ?'In stock':'Out of stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock>0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                                                        {[...Array(product.countInStock).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        )}
                                    <ListGroup.Item>
                                        <Button className='btn-block' 
                                        type='button'
                                        disabled={product.countInStock===0} 
                                        onClick={addToCartHandler}>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                    </Col>

                </Row>

            </>
           )}

        </>
    )
}
export default ProductScreen;