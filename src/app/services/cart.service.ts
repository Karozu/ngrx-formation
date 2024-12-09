import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([
    {
      name: 'Poireau',
      price: 1.74,
      reduce: 0.1,
      id: 333,
    },
  ]);

  private _cart$: Observable<Food[]> = this._cart.asObservable();

  getApiCart(): Observable<Food[]> {
    return this._cart$;
  }

  postApiCart(newFoodInCart: Food): Observable<Food[]> {
    const newId = this._cart.value[this._cart.value.length - 1]?.id ?? 0 + 1;
    this._cart.next([...this._cart.value, { ...newFoodInCart, id: newId }]);
    return this._cart$;
  }

  deleteApiCart(foodInCartToRemove: Food): Observable<void> {
    const cart = [...this._cart.value];
    const index = cart.findIndex((f) => f.id === foodInCartToRemove.id);
    cart.splice(index, 1);

    this._cart.next(cart);
    return of();
  }
}
