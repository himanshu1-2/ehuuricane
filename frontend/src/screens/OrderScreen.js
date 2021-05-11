import React, { useState, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, Image, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../componets/Message'
import Loader from '../componets/Loader'
import { ORDER_PAY_RESET } from '../constants/order'
import { getOrderDetails, payOrder } from '../actions/orderAction'
const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay, loading: loadingPay, } = orderPay

    useEffect(() => {


        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    if (!loading) {
        const addDecimal = (num) => {
            return Math.round((num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on{order.deliveredAt}</Message> :
                                <Message variant='danger'>not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p><strong>Method :</strong>
                                {order.paymentMethod}</p>
                            {order.isPaid ? <Message variant='success'>Paid on{order.paidAt}</Message> : <Message variant='danger'>not paid</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Item</h2>
                            {order.orderItems.length === 0 ? <Message>Your order is Empty</Message> :
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={1}>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}x{item.price}=Rs{item.price * item.qty}
                                                </Col>

                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Card md={4}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>OrderSummary</h2>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rs {order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs {order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs {order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs {order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                        </ListGroupItem>
                    </ListGroup>
                </Card>

            </Row>

        </>

}

export default OrderScreen
