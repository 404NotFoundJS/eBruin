import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';
import { toast } from 'react-toastify';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  if (data.status !== 'available' || data.countInStock === 0) {
    console.log(data.status, data.countInStock);
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add To Watchlist, no more item is available.`,
    });
    toast.error(`Can't Add To Watchlist, no more item is available.`);
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id: data._id,
        name: data.name,
        image: data.productImage,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
