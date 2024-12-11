import { effect } from '@angular/core';
import { getState, signalStoreFeature, withHooks } from '@ngrx/signals';

export function withLogging() {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          // The effect is re-executed on state change.
          const state = getState(store);
          console.log('change state', state);
        });
      },
    })
  );
}
