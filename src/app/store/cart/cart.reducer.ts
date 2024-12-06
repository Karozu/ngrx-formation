import { createReducer, on } from '@ngrx/store';
import { addToCart, getCartList, getCartListSuccess } from './cart.actions';
import { Food } from '../../models/food.model';

export interface CartState {
  cartList: Food[];
}

const cartInitialState: CartState = {
  cartList: [],
};

export const cartReducer = createReducer(
  cartInitialState,
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
