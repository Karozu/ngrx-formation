import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartLength } from './store/cart/cart.selectors';
import { getCartList } from './store/cart/cart.actions';
import { SignalStore } from './store/signal/signal.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'ngrx-app';
  public cartLength$: Observable<number>;
  public userInitialName: Signal<string>;

  private _store = inject(Store);
  private _signalStore = inject(SignalStore);

  constructor() {
    this.userInitialName = this._signalStore.initialName;
  }

  ngOnInit(): void {
    this.cartLength$ = this._store.select(selectCartLength);
    this._store.dispatch(getCartList());
  }
}
