import { createReducer, on } from '@ngrx/store';
import { Food } from 'src/app/models/food.model';
import {
  addFood,
  addFoodFailure,
  addFoodSuccess,
  getFoodList,
  getFoodListFailure,
  getFoodListSuccess,
} from './food.actions';

export interface FoodState {
  foodList: Food[];
  error: Error;
}

const foodInitialState: FoodState = {
  foodList: [],
  error: null,
};

export const foodReducer = createReducer(
  foodInitialState,
  on(getFoodList, (state) => ({
    ...state,
  })),
  on(getFoodListSuccess, (state, { foodList }) => ({
    ...state,
    foodList,
  })),
  on(getFoodListFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(addFood, (state) => ({
    ...state,
  })),
  on(addFoodSuccess, (state, { foodList }) => ({
    ...state,
    foodList,
  })),
  on(addFoodFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
