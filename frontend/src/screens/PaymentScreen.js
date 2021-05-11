import React, { useState } from 'react'

import { Form, Button, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import FormContainer from '../componets/FormContainer'
import CheckOut from '../componets/CheckOut'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (

        <FormContainer>
            <CheckOut step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler} >
                <FormGroup>
                    <Form.Label as='legend'>Select method</Form.Label>


                    <Form.Check type='radio'
                        label='Paypal or Credit Card' id='Paypal' name='paymentMethod'
                        value='Paypal' checked
                        onChange={e => setPaymentMethod(e.target.value)}></Form.Check>

                </FormGroup>
                <Button type='submit' variant='primary'>Continue</Button>

            </Form>
        </FormContainer >
    )
}

export default PaymentScreen
