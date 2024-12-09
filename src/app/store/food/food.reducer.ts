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
  loading: boolean;
}

const foodInitialState: FoodState = {
  foodList: [],
  error: null,
  loading: false,
};

export const foodReducer = createReducer(
  foodInitialState,
  on(getFoodList, (state) => ({
    ...state,
    loading: true,
  })),
  on(getFoodListSuccess, (state, { foodList }) => ({
    ...state,
    foodList,
    loading: false,
  })),
  on(getFoodListFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(addFood, (state) => ({
    ...state,
    loading: true,
  })),
  on(addFoodSuccess, (state, { foodList }) => ({
    ...state,
    foodList,
    loading: false,
  })),
  on(addFoodFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
