import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartList = createSelector(
  selectCartState,
  (state: CartState) => state.cartList
);

export const selectCartLength = createSelector(
  selectCartState,
  (state: CartState) => state.cartList.length
);
