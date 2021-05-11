import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../componets/Loader'
import Message from '../componets/Message'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl, Form } from 'react-bootstrap'
import Rating from '../componets/Ratings'
import { listProductDetails, createProductReview } from '../actions/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/product'
const ProductScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.createProductReview)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, { rating, comment }))
    }
    return (

        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (<>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                            </ListGroupItem>
                            <ListGroupItem>
                                Price:Rs {product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price:
                                </Col>
                                        <Col>
                                            <strong>Rs {product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status:
                                </Col>
                                        <Col>
                                            <strong>Rs {product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                {product.countInStock > 0 && (<ListGroupItem>
                                    <Row>
                                        <Col>
                                        </Col>
                                        <Col>
                                            <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>{
                                                [...Array(product.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))
                                            }</FormControl>
                                        </Col>
                                    </Row>
                                </ListGroupItem>)}

                                <ListGroupItem>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button'
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to cart
                          </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map(review =>
                                <ListGroupItem>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.comment}</p>
                                </ListGroupItem>)}
                            <ListGroupItem>
                                <h2>Write a Customer Review</h2>
                                {successProductReview && (
                                    <Message variant='success'>
                                        Review submitted successfully
                                    </Message>
                                )}
                                {loadingProductReview && <Loader />}
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                {userInfo ? <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating' >
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>Select..</option>
                                            <option value='1'>1-Poor</option>
                                            <option value='2'>2-Fair</option>
                                            <option value='3'>3-Good</option>
                                            <option value='4'>4-Very Good</option>
                                            <option value='5'>Excellent</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment' >
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={e => setComment(e.target.value)} ></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form> : <Message>Please <Link to='/login'>sign In</Link>to write Review</Message>}
                            </ListGroupItem>
                        </ListGroup>

                    </Col>
                </Row>
            </>
            )}
        </>
    )
}

export default ProductScreen
