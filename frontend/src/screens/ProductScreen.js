import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import data from '../data';

const ProductScreen = () => {
    const {id:dataId}=useParams();
    const product=data.find((p)=>p._id===Number(dataId));
    console.log(product.image);
    
    return (
        <>
           <Link className='btn btn-light my-3' to='/'> Go Back
           </Link>
           <Row>
               <Col md={5}>
                   <Image src={`/${product.image}`} alt={product.name} fluid />
               </Col>
               <Col md={4}>
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
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock===0}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
               </Col>

           </Row>
        </>
    )
}
export default ProductScreen;