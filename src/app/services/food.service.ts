import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    },
    {
      name: 'Carotte',
      price: 1.22,
      reduce: 10,
    },
    {
      name: 'Poireau',
      price: 1.74,
      reduce: 10,
    },
  ]);

  private _foods$: Observable<Food[]> = this._foods.asObservable();

  getApiFood(): Observable<Food[]> {
    return this._foods$;
  }

  postApiFood(newFood: Food): Observable<Food[]> {
    this._foods.next([...this._foods.value, newFood]);
    return this._foods$;
  }
}
