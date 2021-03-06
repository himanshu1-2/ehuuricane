import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../componets/Message'
import Loader from '../componets/Loader'
import FormContainer from '../componets/FormContainer'
import { getUserDetail, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/user'
const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')

        }
        else {
            if (!user.name || user._id !== userId)
                dispatch(getUserDetail(userId))
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, dispatch, history, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
       </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Form onSubmit={submitHandler} >
                    <FormGroup controlId='name' >
                        <FormLabel>Name</FormLabel>
                        <FormControl type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}  ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email' >
                        <FormLabel>Email Address</FormLabel>
                        <FormControl type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}  ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='isadmin' >

                        <Form.Check type='checkbox' label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}  >
                        </Form.Check>
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

export default UserEditScreen
