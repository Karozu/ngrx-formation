import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalState } from './cart.reducer';

export const selectGlobalState = createFeatureSelector<GlobalState>('cart');

export const selectCartList = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.cartList
);
