import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { catchError, pipe, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withLogging } from './logging.feature';
import { withUserRoleMethod } from './user-role.feature';

export interface SignalState {
  user: User;
  error: Error;
  loading: boolean;
}

const signalInitialState: SignalState = {
  user: {
    lastName: null,
    firstName: null,
    address: {
      city: null,
      country: null,
      zip: null,
      street: null,
    },
    id: null,
  },
  error: null,
  loading: false,
};

export const SignalStore = signalStore(
  { providedIn: 'root' },
  withState(signalInitialState),
  withComputed(({ user: { firstName, lastName } }) => ({
    name: computed(() => `${firstName() ?? ''} ${lastName() ?? ''}`),
    initialName: computed(
      () => `${firstName()?.[0] ?? ''} ${lastName()?.[0] ?? ''}`
    ),
  })),
  withMethods((store, userService = inject(UserService)) => ({
    reset() {
      patchState(store, signalInitialState);
    },
    changeName(firstName: string, lastName: string) {
      patchState(store, { user: { ...store.user(), firstName, lastName } });
    },
    getUserData: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((userId: number) => {
          return userService.getApiUserDetails(userId).pipe(
            tap((user) => patchState(store, { loading: false, user })),
            catchError((error) => {
              patchState(store, { loading: false, error });
              return error;
            })
          );
        })
      )
    ),
  })),
  withUserRoleMethod(),
  withHooks(({ name, changeName }) => {
    return {
      onInit() {
        console.log('init store');
      },
      onDestroy() {
        console.log("destruction du store contenant l'utilisateur : ", name());
        changeName('', '');
      },
    };
  }),
  withLogging()
);
