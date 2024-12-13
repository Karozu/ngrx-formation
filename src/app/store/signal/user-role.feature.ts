import { inject } from '@angular/core';
import { signalStoreFeature, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap, catchError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export function withUserRoleMethod() {
  return signalStoreFeature(
    withMethods((store, userService = inject(UserService)) => ({
      getUserData: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((userId: number) => {
            return userService.getApiUserRole(userId).pipe(
              tap((user) => patchState(store, { loading: false, user })),
              catchError((error) => {
                patchState(store, { loading: false, error });
                return error;
              })
            );
          })
        )
      ),
    }))
  );
}
