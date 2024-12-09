import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../services/cart.service';
import * as cartActions from './cart.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartList } from './cart.selectors';

export const getCartList$ = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.getCartList),
      switchMap(() => cartService.getApiCart()),
      map((cartList) => {
        return cartActions.getCartListSuccess({ cartList });
      }),
      catchError((error: Error) => {
        return of(cartActions.getCartListFailure({ error }));
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
      map((cartList) => cartActions.addToCartSuccess({ cartList })),
      catchError((error: Error) => {
        return of(cartActions.addToCartFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const removeToCart$ = createEffect(
  (
    actions$ = inject(Actions),
    cartService = inject(CartService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(cartActions.removeToCart),
      switchMap(({ foodToRemove }) => {
        return cartService.deleteApiCart(foodToRemove).pipe(
          withLatestFrom(store.select(selectCartList)),
          map(([_actions, cartList]) => {
            const cart = [...cartList];
            const index = cart.findIndex((f) => f.id === foodToRemove.id);
            cart.splice(index, 1);
            return cart;
          }),
          map((cartList) => cartActions.removeToCartSuccess({ cartList }))
        );
      }),
      catchError((error: Error) => {
        return of(cartActions.removeToCartFailure({ error }));
      })
    );
  },
  { functional: true }
);
