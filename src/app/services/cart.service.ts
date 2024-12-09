import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Simule les valeurs théoriquement dans une base de données
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
    return this._cart$.pipe(
      delay(2000),
      map(() => this._cart.value),
      catchError(() => {
        throw new Error(
          `Erreur lors de la récupération de la liste dans le panier`
        );
      })
    );
  }

  postApiCart(newFoodInCart: Food): Observable<Food[]> {
    const newId = this._cart.value[this._cart.value.length - 1]?.id ?? 0 + 1;

    // Simule la mise à jour théorique des données dans la base de données
    this._cart.next([...this._cart.value, { ...newFoodInCart, id: newId }]);

    return this._cart$.pipe(
      catchError(() => {
        throw new Error(`Erreur lors de l'ajout d'un produit au panier`);
      })
    );
  }

  deleteApiCart(foodInCartToRemove: Food): Observable<void> {
    const cart = [...this._cart.value];
    const index = cart.findIndex((f) => f.id === foodInCartToRemove.id);
    cart.splice(index, 1);

    // Simule la mise à jour théorique des données dans la base de données
    this._cart.next(cart);

    return of().pipe(
      catchError(() => {
        throw new Error(`Erreur lors de la suppression d'un produit au panier`);
      })
    );
  }
}
