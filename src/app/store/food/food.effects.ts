import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FoodService } from 'src/app/services/food.service';
import * as foodActions from './food.actions';
import { map, switchMap } from 'rxjs/operators';

export const getFoodList$ = createEffect(
  (actions$ = inject(Actions), foodService = inject(FoodService)) => {
    return actions$.pipe(
      ofType(foodActions.getFoodList),
      switchMap(() => foodService.getApiFood()),
      map((foodList) => {
        return foodActions.getFoodListSuccess({ foodList });
      })
    );
  },
  { functional: true }
);

export const addFood$ = createEffect(
  (actions$ = inject(Actions), foodService = inject(FoodService)) => {
    return actions$.pipe(
      ofType(foodActions.addFood),
      switchMap(({ food }) => foodService.postApiFood(food)),
      map((foodList) => foodActions.addFoodSuccess({ foodList }))
    );
  },
  { functional: true }
);
