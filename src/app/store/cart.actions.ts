import { createAction, props } from '@ngrx/store';
import { Food } from '../models/food.model';

export const getCartList = createAction('[Cart] get cartList');

export const getCartListSuccess = createAction(
  '[Cart] get cartList Success',
  props<{ cartList: Food[] }>()
);

export const addToCart = createAction(
  '[Cart] add to cart',
  props<{ newFood: Food }>()
);

export const addToCartSuccess = createAction('[Cart] add to cart Success');
