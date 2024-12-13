import { BehaviorSubject, catchError, delay, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { USER_ROLE } from '../enums/role.enum';

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

  public getApiUserRole(userId: number): Observable<USER_ROLE> {
    if (userId) {
      return of(USER_ROLE.USER);
    }
    return of(USER_ROLE.NOT_CONNECTED);
  }
}
