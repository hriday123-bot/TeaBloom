import React from 'react'
import { Card } from 'react-bootstrap'


const Data = ({data}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <a href={`/data/${data._id}`}>
           <Card.Img src={data.image} variant='top' />
        </a>

        <Card.Body>
            <a href={`/data/${data._id}`}>
               <Card.Title as="div">
                   <strong>{data.name}</strong>
               </Card.Title>
            </a>
            <Card.Text as='h3'>
                {data.price} ₨
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Data;
