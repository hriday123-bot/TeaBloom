import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Data = ({data}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link href={`/data/${data._id}`}>
           <Card.Img src={data.image} variant='top' />
        </Link>

        <Card.Body>
            <Link href={`/data/${data._id}`}>
               <Card.Title as="div">
                   <strong>{data.name}</strong>
               </Card.Title>
               <Card.Text style={{font:'5px'}}>
                   {data.description.substring(0, 50)+" ..."}
               </Card.Text>
            </Link>
            <Card.Text as='h3'>
                {data.price} ₨
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Data;
