import { createReducer, on } from '@ngrx/store';
import { Food } from 'src/app/models/food.model';
import { getFoodList, getFoodListSuccess } from './food.actions';

export interface FoodState {
  foodList: Food[];
}

const foodInitialState: FoodState = {
  foodList: [],
};

export const foodReducer = createReducer(
  foodInitialState,
  on(getFoodList, (state) => ({
    ...state,
  })),
  on(getFoodListSuccess, (state, { foodList }) => ({
    ...state,
    foodList,
  }))
);
