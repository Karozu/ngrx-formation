import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);

  private _cart$: Observable<Food[]> = this._cart.asObservable();

  getApiCart(): Observable<Food[]> {
    return this._cart$;
  }

  postApiCart(newFoodInCart: Food): Observable<Food[]> {
    this._cart.next([...this._cart.value, newFoodInCart]);
    return this._cart$;
  }
}
