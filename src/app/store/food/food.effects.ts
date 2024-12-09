import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FoodService } from 'src/app/services/food.service';
import * as foodActions from './food.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export const getFoodList$ = createEffect(
  (actions$ = inject(Actions), foodService = inject(FoodService)) => {
    return actions$.pipe(
      ofType(foodActions.getFoodList),
      switchMap(() => foodService.getApiFood()),
      map((foodList) => {
        return foodActions.getFoodListSuccess({ foodList });
      }),
      catchError((error: Error) => {
        return of(foodActions.getFoodListFailure({ error }));
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
      map((foodList) => foodActions.addFoodSuccess({ foodList })),
      catchError((error: Error) => {
        return of(foodActions.addFoodFailure({ error }));
      })
    );
  },
  { functional: true }
);
