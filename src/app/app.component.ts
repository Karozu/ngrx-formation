import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartLength } from './store/cart/cart.selectors';
import { getCartList } from './store/cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'ngrx-app';
  public cartLength$: Observable<number>;

  private _store = inject(Store);

  ngOnInit(): void {
    this.cartLength$ = this._store.select(selectCartLength);
    this._store.dispatch(getCartList());
  }
}
