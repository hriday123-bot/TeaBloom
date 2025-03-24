import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


const Data = ({data}) => {
  return (
    <Card className="my-3 p-3 rounded product-card">
        <Link to={`/data/${data._id}`}>
           <Card.Img src={data.image} variant='top' />
        </Link>

        <Card.Body>
            <Link to={`/data/${data._id}`}>
               <Card.Title as="div" className='product-title'>
                   <strong>{data.name}</strong>
               </Card.Title>
               <Card.Text style={{font:'5px'}}>
                   {data.description.substring(0, 50)+" ..."}
               </Card.Text>
            </Link>
            <Card.Text as='div' className='rating svg'>
                <Rating value={data.rating} text={`${data.numberOfReviews} reviews`} />
            </Card.Text>
            <Card.Text as='h4'>
                {data.price} ₨
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Data;
