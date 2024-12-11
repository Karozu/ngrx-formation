import { BehaviorSubject, catchError, delay, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Simule les valeurs théoriquement dans une base de données
  private _user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    {
      lastName: 'Guery',
      firstName: 'Romain',
      address: {
        city: 'Pere noël poste',
        country: 'France',
        zip: '33333',
        street: `C'est un secret, seule la mère noel la connait`,
      },
      id: 0,
    },
  ]);

  private _user$: Observable<User[]> = this._user.asObservable();

  public getApiUserDetails(userId: number): Observable<User> {
    return this._user$.pipe(
      delay(2000),
      map(() => this._user.value.find((u) => u.id === userId)),
      catchError(() => {
        throw new Error(
          `Erreur lors de la récupération des informations de l'utilisateur`
        );
      })
    );
  }
}
