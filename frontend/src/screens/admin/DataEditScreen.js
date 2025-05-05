import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';

import { useGetDataByIdQuery, useUpdateDataMutation ,useUploadProductImageMutation} from '../../slices/dataApiSlice'

const DataEditScreen = () => {
    const { id: dataId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [origin, setOrigin] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetDataByIdQuery(dataId);

    const [updateData, { isLoading: loadingUpdate }] = useUpdateDataMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setOrigin(product.origin);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedData={
            dataId,
            name,
            price,
            image,
            origin,
            category,
            countInStock,
            description,
            inStock: true,
        }
        const result= await updateData(updatedData);
        if (result.error) {
            toast.error(result.error.data.message);
        } else {
            toast.success('Data updated successfully');
            navigate('/admin/productlist');
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await uploadProductImage(formData).unwrap();
            console.log('Image uploaded successfully:', res);
            setImage(res.image);
            toast.success('Image uploaded successfully',res.message);
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(error?.data?.message);
        }
        
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h3>Edit Data</h3>
                {loadingUpdate && <Loader />}

                {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='image'className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image Url'
                                value={image}
                                onChange={(e)=>setImage(e.target.value)}
                            >
                            </Form.Control>
                            <Form.Control type='file'
                                label='Choose File'
                                onChange={uploadFileHandler}
                            >

                            </Form.Control>
                                
                        </Form.Group>
                        <Form.Group controlId='origin'className="my-2">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter origin'
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'className="my-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'className="my-2">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                       <Button
                            type='submit'
                            variant='primary'
                            
                        >
                            Update
                        </Button>
                        
                    </Form>
                )}

            </FormContainer>

        </>
    )
}

export default DataEditScreen