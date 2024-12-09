import { BehaviorSubject, catchError, delay, map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // Simule les valeurs théoriquement dans une base de données
  private _foods: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([
    {
      name: 'Patate',
      price: 2.01,
      id: 0,
    },
    {
      name: 'Carotte',
      price: 1.22,
      reduce: 0.1,
      id: 1,
    },
    {
      name: 'Poireau',
      price: 1.74,
      reduce: 0.22,
      id: 2,
    },
    {
      name: 'Potiron',
      price: 1.99,
      reduce: 0.22,
      id: 3,
    },
    {
      name: 'Pomme',
      price: 2.74,
      id: 4,
    },
  ]);

  private _foods$: Observable<Food[]> = this._foods.asObservable();

  public getApiFood(): Observable<Food[]> {
    return this._foods$.pipe(
      delay(2000),
      map(() => this._foods.value),
      catchError(() => {
        throw new Error(
          `Erreur lors de la récupération de la liste des produits`
        );
      })
    );
  }

  public postApiFood(newFood: Food): Observable<Food[]> {
    // Erreur généré volontairement lorsqu'on possède 6 éléments différents afin de pouvoir voir comment fonctionne une vraie erreur qui se génère
    if (this._foods.value.length >= 6) {
      return this._foods$.pipe(
        delay(2000),
        tap(() => {
          throw new Error(
            `Impossible d'ajouter "${newFood.name}" parce que j'ai plus envie`
          );
        })
      );
    }

    const newId =
      this._foods.value[this._foods.value.length - 1].id ??
      this.getRandomNumber() + 1;

    // Simule la mise à jour théorique des données dans la base de données
    this._foods.next([...this._foods.value, { ...newFood, id: newId }]);

    return this._foods$.pipe(
      catchError(() => {
        throw new Error(`Erreur lors de l'ajout d'un nouveau produit`);
      })
    );
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 9999);
  }
}
