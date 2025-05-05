import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetDataQuery,useCreateDataMutation,useDeleteDataMutation } from '../../slices/dataApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { data, error, isLoading,refetch } = useGetDataQuery();
    
    const [createData, {isLoading:loadingCreate}] = useCreateDataMutation();
    const [deleteData, {isLoading:loadingDelete}] = useDeleteDataMutation();

    const deletHandler = async(id) => {
        if (window.confirm('Are you sure you want to delete this product ?')) {
            try {
                await deleteData(id);
                refetch();
                toast.success('Product Deleted');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    const createDataHandler = async () => {
        if (window.confirm('Are you sure you want to create a data ?')) {
            try {
                await createData();
                refetch();
                
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h3>Products</h3>
                </Col>
                <Col className='text-end'>

                    <Button className='my-3' variant='primary' onClick={createDataHandler}>
                        
                        <FaEdit />Create Product
                    </Button>

                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (  
                 <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>ORIGIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>Rs {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.origin}</td>

                                    <td>
                                        <Link to={`/admin/data/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </Link>

                                        <Button variant='danger' className='btn-sm mx-2' onClick={()=>deletHandler(product._id)}>
                                            <FaTrash style={{color:'white'}}/>
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                 </>
            )}

        </>
    )
}

export default ProductListScreen