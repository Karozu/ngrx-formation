import { FormControl } from '@angular/forms';

export interface Food {
  name: string;
  price: number;
  reduce?: number;
  id?: number;
}

export interface FoodFormGroup {
  name: FormControl<string>;
  price: FormControl<number>;
  reduce: FormControl<number>;
}
