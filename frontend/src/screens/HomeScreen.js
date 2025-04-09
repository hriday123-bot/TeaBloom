import {Row,Col} from 'react-bootstrap'
import Data from '../components/Data'
import {useGetDataQuery} from '../slices/dataApiSlice';
import Loader from '../components/Loader'
import Message from '../components/Message'


const HomeScreen = () => {
  const {data,isLoading,error} = useGetDataQuery();
  
  return (
    <>
        {isLoading? (
           <Loader />
        ):error ?
         <Message variant='danger'>
            {error?.data?.message || error.error}
         </Message>
         : (
          <>
            <h3>Latest Tea</h3>
            <Row >
                {data.map((data)=>(
                    <Col key={data._id} sm={12} md={6} lg={4} xl={3}>
                        <Data data={data} />
                    </Col>
                )
                )}
            </Row>
          </>
        )}
    </>
  )
}

export default HomeScreen;
