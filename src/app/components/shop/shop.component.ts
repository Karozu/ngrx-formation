import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { Observable } from 'rxjs';
import { Food } from '../../models/food.model';
import { getFoodList } from '../../store/food/food.actions';
import { selectFoodList } from '../../store/food/food.selectors';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  public foods$: Observable<Food[]>;

  private _store = inject(Store);

  ngOnInit(): void {
    this.foods$ = this._store.select(selectFoodList);
    this._store.dispatch(getFoodList());
  }

  public addToCart(newFood: Food): void {
    this._store.dispatch(addToCart({ newFood }));
  }
}
