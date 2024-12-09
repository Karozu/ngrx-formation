import { createAction, props } from '@ngrx/store';
import { Food } from '../../models/food.model';

export const getCartList = createAction('[Cart] get cartList');

export const getCartListSuccess = createAction(
  '[Cart] get cartList Success',
  props<{ cartList: Food[] }>()
);

export const getCartListFailure = createAction(
  '[Cart] get cartList Failure',
  props<{ error: Error }>()
);

export const addToCart = createAction(
  '[Cart] add to cart',
  props<{ newFood: Food }>()
);

export const addToCartSuccess = createAction(
  '[Cart] add to cart Success',
  props<{ cartList: Food[] }>()
);

export const addToCartFailure = createAction(
  '[Cart] add to cart Failure',
  props<{ error: Error }>()
);

export const removeToCart = createAction(
  '[Cart] remove to cart',
  props<{ foodToRemove: Food }>()
);

export const removeToCartSuccess = createAction(
  '[Cart] remove to cart Success',
  props<{ cartList: Food[] }>()
);

export const removeToCartFailure = createAction(
  '[Cart] remove to cart Failure',
  props<{ error: Error }>()
);
