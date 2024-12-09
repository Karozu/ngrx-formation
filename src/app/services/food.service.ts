import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
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
    return this._foods$;
  }

  public postApiFood(newFood: Food): Observable<Food[]> {
    if (this._foods.value.length >= 6) {
      return this._foods$.pipe(
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
    this._foods.next([...this._foods.value, { ...newFood, id: newId }]);
    return this._foods$;
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 9999);
  }
}
