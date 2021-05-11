import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
    productCreateReducer, productDeleteReducer,
    productDetailReducer, productListReducer,
    productReviewCreateReducer, productTopRatedReducer, productUpdateReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer, userListReducer, userRegisterReducer,
    userDeleteReducer, userDetailReducer, userUpdateProfileReducer,
    userUpdateReducer
} from './reducers/userReducer'
import {
    orderCreateReducer, orderDetailsReducer,
    orderListReducer, orderPayReducer
} from './reducers/orderReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    productTopRated: productTopRatedReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createProductReview: productReviewCreateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    userUpdate: userUpdateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer
})
const cartItemsFromStorage = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },

}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store