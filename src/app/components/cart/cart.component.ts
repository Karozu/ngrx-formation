import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartList } from '../../store/cart/cart.selectors';
import { getCartList, removeToCart } from '../../store/cart/cart.actions';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private _store = inject(Store);

  public cartList$: Observable<Food[]> = this._store.select(selectCartList);

  ngOnInit(): void {
    this._store.dispatch(getCartList());
  }

  public removeToCart(food: Food): void {
    this._store.dispatch(removeToCart({ food }));
  }
}
