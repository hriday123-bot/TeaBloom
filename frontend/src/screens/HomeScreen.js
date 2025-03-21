import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {Row,Col} from 'react-bootstrap'
import Data from '../components/Data'


const HomeScreen = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const {data}=await axios.get('/api/data');
        setData(data);
      }catch(error){
        console.log("An error occurred while fetching data",error);
      } 
    }
    fetchData();
  },[])
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
