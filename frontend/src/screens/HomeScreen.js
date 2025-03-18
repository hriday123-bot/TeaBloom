import React from 'react'
import {Row,Col} from 'react-bootstrap'
import data from '../data'
import Data from '../components/Data'


const HomeScreen = () => {
  return (
    <>
        <h4>Latest Tea</h4>
        <Row >
            {data.map((data)=>(
                <Col key={data._id} sm={12} md={6} lg={4} xl={3}>
                    <Data data={data} />
                </Col>
            )
            )}
        </Row>
    </>
  )
}

export default HomeScreen;
