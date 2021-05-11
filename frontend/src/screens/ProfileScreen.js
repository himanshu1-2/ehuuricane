import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../componets/Message'
import Loader from '../componets/Loader'

import { getUserDetail, updateUserProfile } from '../actions/userAction'
const ProfileScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name)
                dispatch(getUserDetail('profile'))
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword)
            setMessage('Passwords do not match')
        else
            dispatch(updateUserProfile({ _id: user._id, name, email, password }))

    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}

            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>ProfileUpdated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <FormGroup controlId='name' >
                    <FormLabel>Name</FormLabel>
                    <FormControl type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}  ></FormControl>
                </FormGroup>
                <FormGroup controlId='email' >
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}  ></FormControl>
                </FormGroup>
                <FormGroup controlId='password' >
                    <FormLabel>Password</FormLabel>
                    <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}  ></FormControl>
                </FormGroup>
                <FormGroup controlId='confirmPassword' >
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary' >
                    Update
           </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
}

export default ProfileScreen
