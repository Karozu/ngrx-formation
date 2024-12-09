import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoodState } from './food.reducer';

export const selectFoodState = createFeatureSelector<FoodState>('food');

export const selectFoodList = createSelector(
  selectFoodState,
  (state: FoodState) => state.foodList
);

export const selectFoodError = createSelector(
  selectFoodState,
  (state: FoodState) => state.error
);
