import React, { useState } from 'react'

import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'
import FormContainer from '../componets/FormContainer'
import CheckOut from '../componets/CheckOut'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }
    return (

        <FormContainer>
            <CheckOut step1 step2 />
            <h1>Shipping </h1>
            <Form onSubmit={submitHandler} >
                <FormGroup controlId='address' >
                    <FormLabel>Address</FormLabel>
                    <FormControl type='text' placeholder='Enter Address' value={address} required
                        onChange={(e) => setAddress(e.target.value)}  ></FormControl>
                </FormGroup>
                <FormGroup controlId='city' >
                    <FormLabel>City</FormLabel>
                    <FormControl type='text' placeholder='Enter city' value={city} required
                        onChange={(e) => setCity(e.target.value)}  ></FormControl>
                </FormGroup>
                <FormGroup controlId='postalCode' >
                    <FormLabel>postalCode</FormLabel>
                    <FormControl type='text' placeholder='Enter PostalCode' value={postalCode} required
                        onChange={(e) => setPostalCode(e.target.value)}  ></FormControl>
                </FormGroup>
                <FormGroup controlId='country' >
                    <FormLabel>Country</FormLabel>
                    <FormControl type='text' placeholder='Enter Country' value={country} required
                        onChange={(e) => setCountry(e.target.value)}  ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer >
    )
}

export default ShippingScreen
