import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Message from '../componets/Message'
import Loader from '../componets/Loader'
import FormContainer from '../componets/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/product'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        }
        else {
            if (!product.name || product._id !== productId)
                dispatch(listProductDetails(productId))
            else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, productId, product, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name, price,
            brand,
            category,
            image,
            description,
            countInStock
        }))
    }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
       </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Form onSubmit={submitHandler} >
                    <FormGroup controlId='name' >
                        <FormLabel>Name</FormLabel>
                        <FormControl type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}  ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='price' >
                        <FormLabel>Price</FormLabel>
                        <FormControl type='number' plac eholder='Enter Price'
                            value={price} onChange={(e) => setPrice(e.target.value)}  >
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='image' >
                        <FormLabel>Image</FormLabel>
                        <FormControl type='text' placeholder='Enter Image '
                            value={image} onChange={(e) => setImage(e.target.value)}  >
                        </FormControl>
                        <Form.File id='image-file' label='choose File' custom onChange={uploadFileHandler}>

                        </Form.File>
                        {uploading && <Loader />}
                    </FormGroup>
                    <FormGroup controlId='brand' >
                        <FormLabel>Brand</FormLabel>
                        <FormControl type='text' placeholder='Enter Brand'
                            value={brand} onChange={(e) => setBrand(e.target.value)}  >
                        </FormControl>

                    </FormGroup>
                    <FormGroup controlId='category' >
                        <FormLabel>category</FormLabel>
                        <FormControl type='text' placeholder='Enter Category'
                            value={category} onChange={(e) => setCategory(e.target.value)}  >
                        </FormControl>

                    </FormGroup>
                    <FormGroup controlId='description' >
                        <FormLabel>description</FormLabel>
                        <FormControl type='text' placeholder='Enter Description'
                            value={description} onChange={(e) => setDescription(e.target.value)}  >
                        </FormControl>

                    </FormGroup>
                    <FormGroup controlId='countInStock' >
                        <FormLabel>CountInStock</FormLabel>
                        <FormControl type='number' placeholder='Enter CountInStock'
                            value={countInStock} onChange={(e) => setCountInStock(e.target.value)}  >
                        </FormControl>

                    </FormGroup>
                    <Button type='submit' variant='primary' >
                        Update
           </Button>
                </Form>
                )}


            </FormContainer>

        </>
    )
}

export default ProductEditScreen
