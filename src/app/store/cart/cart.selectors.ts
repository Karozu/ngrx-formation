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

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

export const selectLoadingCart = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);
