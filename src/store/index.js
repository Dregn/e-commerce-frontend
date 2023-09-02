
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers,productDetailsReducers } from '../reducers/productreducers'
import { cartReducer } from '../reducers/cartReducers'

const reducer = combineReducers({
    productList:productListReducers,
    productDetails: productDetailsReducers,
    cart:cartReducer

})

const cartItemsFromStorage= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') ):[]
const userInfoFromStorage= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ):null
console.log(cartItemsFromStorage)
const initialState= {    cart: {cartItems:cartItemsFromStorage},user:{user:userInfoFromStorage}}

const middleware=[thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))



export default store
