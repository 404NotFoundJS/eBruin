import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
} from './reducers/orderReducers';
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userSigninReducer,
  userSignUpReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },

  cart: {
    orderInfo: localStorage.getItem('orderInfo')
      ? JSON.parse(localStorage.getItem('orderInfo'))
      : {},
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const reducer = combineReducers({
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userSignin: userSigninReducer,
  userSignUp: userSignUpReducer,
  userDetails: userDetailsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
