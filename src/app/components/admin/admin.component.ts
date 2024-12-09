import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Observable, tap } from 'rxjs';
import { ERROR_NAME } from '../../enums/errors.enum';
import { Store } from '@ngrx/store';
import { FoodService } from '../../services/food.service';
import { Food, FoodFormGroup } from '../../models/food.model';
import { addFood, getFoodList } from '../../store/food/food.actions';
import {
  selectFoodError,
  selectFoodList,
} from '../../store/food/food.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  public foodFormGroup!: FormGroup<FoodFormGroup>;
  public showCurrentlyExistNameError!: boolean;
  public showMaxAuthorizedReduceError!: boolean;
  public showRequiredNameError!: boolean;
  public showRequiredPriceError!: boolean;
  public foods$: Observable<Food[]>;
  private foodError$: Observable<Error>;

  private _matSnackBar = inject(MatSnackBar);
  private _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.foods$ = this._store.select(selectFoodList);
    this.foodError$ = this._store.select(selectFoodError);

    this._store.dispatch(getFoodList());
    this.initForm();
    this.initWatchers();
    this.manageErrors();
  }

  public save(): void {
    if (this.foodFormGroup.valid) {
      this._store.dispatch(
        addFood({
          food: {
            name: this.foodFormGroup.controls.name.value,
            reduce: this.foodFormGroup.controls.reduce.value,
            price: this.foodFormGroup.controls.price.value,
          },
        })
      );
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
  }

  private findErrorByControl(
    controlName: string,
    errorName: ERROR_NAME
  ): boolean {
    return this.foodFormGroup.get(controlName)?.hasError(errorName) ?? false;
  }

  private manageErrors(): void {
    this.foodError$
      .pipe(
        filter((error) => !!error),
        tap((error) => {
          console.log(error);
          this._matSnackBar.open(error.message, 'fermer', {
            duration: 2000,
          });
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
