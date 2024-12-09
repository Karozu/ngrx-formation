import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  getCartList,
  getCartListSuccess,
  removeToCart,
  removeToCartFailure,
  removeToCartSuccess,
} from './cart.actions';
import { Food } from '../../models/food.model';

export interface CartState {
  cartList: Food[];
  error: Error;
  loading: boolean;
}

const cartInitialState: CartState = {
  cartList: [],
  error: null,
  loading: false,
};

export const cartReducer = createReducer(
  cartInitialState,
  on(getCartList, (state) => ({
    ...state,
    loading: true,
  })),
  on(getCartListSuccess, (state, { cartList }) => ({
    ...state,
    cartList,
    loading: false,
  })),
  on(addToCart, (state) => ({
    ...state,
    loading: true,
  })),
  on(addToCartSuccess, (state, { cartList }) => ({
    ...state,
    cartList,
    loading: false,
  })),
  on(addToCartFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(removeToCart, (state) => ({
    ...state,
    loading: true,
  })),
  on(removeToCartSuccess, (state, { cartList }) => ({
    ...state,
    cartList,
    loading: false,
  })),
  on(removeToCartFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
