import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../services/cart.service';
import * as cartActions from './cart.actions';
import { map, switchMap } from 'rxjs';

export const getCartList$ = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.getCartList),
      switchMap(() => cartService.getApiCart()),
      map((cartList) => {
        return cartActions.getCartListSuccess({ cartList });
      })
    );
  },
  { functional: true }
);

export const addToCart$ = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.addToCart),
      switchMap(({ newFood }) => cartService.postApiCart(newFood)),
      map(() => cartActions.addToCartSuccess())
    );
  },
  { functional: true }
);

export const removeToCart$ = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.removeToCart),
      switchMap(({ food }) => cartService.postApiCart(food)),
      map(() => cartActions.removeToCartSuccess())
    );
  },
  { functional: true }
);
