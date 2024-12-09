import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCartList,
  selectLoadingCart,
} from '../../store/cart/cart.selectors';
import { getCartList, removeToCart } from '../../store/cart/cart.actions';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public loadingCart$: Observable<boolean>;
  public cartList$: Observable<Food[]>;

  private _store = inject(Store);
  ngOnInit(): void {
    this.cartList$ = this._store.select(selectCartList);
    this.loadingCart$ = this._store.select(selectLoadingCart);

    this._store.dispatch(getCartList());
  }

  public removeToCart(foodToRemove: Food): void {
    this._store.dispatch(removeToCart({ foodToRemove }));
  }
}
