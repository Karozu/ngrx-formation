import { createAction, props } from '@ngrx/store';
import { Food } from 'src/app/models/food.model';

export const getFoodList = createAction('[Food] get foodList');

export const getFoodListSuccess = createAction(
  '[Food] get foodList Success',
  props<{ foodList: Food[] }>()
);

export const addFood = createAction(
  '[Food] post food',
  props<{ food: Food }>()
);

export const addFoodSuccess = createAction(
  '[Food] post food Success',
  props<{ foodList: Food[] }>()
);
