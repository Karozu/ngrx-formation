import { createReducer, on } from '@ngrx/store';
import { addToCart, getCartList, getCartListSuccess } from './cart.actions';
import { Food } from '../models/food.model';

export interface GlobalState {
  cartList: Food[];
}

const globalInitialState: GlobalState = {
  cartList: [],
};

export const cartReducer = createReducer(
  globalInitialState,
  on(getCartList, (state) => ({
    ...state,
  })),
  on(getCartListSuccess, (state, { cartList }) => ({
    ...state,
    cartList,
  })),
  on(addToCart, (state, { newFood }) => ({
    ...state,
    cartList: [...state.cartList, newFood],
  }))
);
