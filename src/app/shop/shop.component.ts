import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { ERROR_NAME } from '../enums/errors.enum';
import { Food } from '../models/food.model';

export interface FoodFormGroup {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  reduce: FormControl<number | null>;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  foods: Food[] = [];
  foodFormGroup!: FormGroup<FoodFormGroup>;
  showCurrentlyExistNameError!: boolean;
  showMaxAuthorizedReduceError!: boolean;
  showRequiredNameError!: boolean;
  showRequiredPriceError!: boolean;

  private _foodService = inject(FoodService);
  private _store = inject(Store);
  private _matSnackBar = inject(MatSnackBar);

  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
    this.initWatchers();
    this._foodService
      .getApiFood()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result: Food[]) => {
        this.foods = result;
      });
  }

  addToCart(newFood: Food): void {
    this._store.dispatch(addToCart({ newFood }));
  }

  trackFood(index: number, food: Food): number {
    return index;
  }

  save(): void {
    if (this.foodFormGroup.valid) {
      this._foodService
        .postApiFood({
          name: this.foodFormGroup.controls.name.value ?? '',
          reduce: this.foodFormGroup.controls.reduce.value ?? 0,
          price: this.foodFormGroup.controls.price.value ?? 0,
        })
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe();
    } else {
      this.foodFormGroup.markAllAsTouched();
      this.showRequiredNameError = this.findErrorByControl(
        'name',
        ERROR_NAME.REQUIRED
      );
      this.showRequiredPriceError = this.findErrorByControl(
        'price',
        ERROR_NAME.REQUIRED
      );
      this.showMaxAuthorizedReduceError = this.findErrorByControl(
        'reduce',
        ERROR_NAME.MAX_PERCENTAGE_REDUCE
      );

      this._matSnackBar.open(
        `Vous devez remplir tous les champs obligatoire avant d'enregistrer`,
        'fermer',
        {
          duration: 2000,
        }
      );
    }
  }

  private initForm(): void {
    this.foodFormGroup = new FormGroup<FoodFormGroup>({
      name: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        validators: [Validators.required, Validators.min(0.1)],
      }),
      reduce: new FormControl(null),
    });
  }

  private initWatchers(): void {
    this.foodFormGroup.controls.name.statusChanges
      .pipe(
        tap(() => {
          this.showCurrentlyExistNameError = this.findErrorByControl(
            'name',
            ERROR_NAME.CURRENTLY_EXIST
          );
          this.showRequiredNameError = this.findErrorByControl(
            'name',
            ERROR_NAME.REQUIRED
          );
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();

    this.foodFormGroup.controls.price.statusChanges
      .pipe(
        tap(() => {
          this.showRequiredPriceError = this.findErrorByControl(
            'price',
            ERROR_NAME.REQUIRED
          );
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();

    this.foodFormGroup.controls.reduce.statusChanges
      .pipe(
        tap(() => {
          this.showMaxAuthorizedReduceError = this.findErrorByControl(
            'reduce',
            ERROR_NAME.MAX_PERCENTAGE_REDUCE
          );
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private findErrorByControl(
    controlName: string,
    errorName: ERROR_NAME
  ): boolean {
    return this.foodFormGroup.get(controlName)?.hasError(errorName) ?? false;
  }
}
