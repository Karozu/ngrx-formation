import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Food } from '../../models/food.model';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  public foods$: Observable<Food[]>;
  public loadingFood$: Observable<boolean>;
  private _store = inject(Store);

  ngOnInit(): void {
    // TODO: Mettre en place le branchement des observables avec les données du store associé
  }

  public addToCart(newFood: Food): void {
    // TODO: Mettre en place l'ajout de mon produit dans le panier dans le store
  }
}
