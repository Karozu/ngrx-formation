import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public loadingCart$: Observable<boolean>;
  public cartList$: Observable<Food[]>;

  private _store = inject(Store);

  ngOnInit(): void {
    // TODO: Mettre en place le branchement des observables avec les données du store associé
  }

  public removeToCart(foodToRemove: Food): void {
    // TODO: Mettre en place la suppression de mon produit dans le store
  }
}
