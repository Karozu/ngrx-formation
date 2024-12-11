import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cartReducer } from './store/cart/cart.reducer';
import * as CartEffects from './store/cart/cart.effects';
import * as FoodEffects from './store/food/food.effects';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { AdminComponent } from './components/admin/admin.component';
import { MatDividerModule } from '@angular/material/divider';
import { foodReducer } from './store/food/food.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [AppComponent, CartComponent, ShopComponent, AdminComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    StoreModule.forRoot({ cart: cartReducer, food: foodReducer }),
    StoreDevtoolsModule.instrument({ logOnly: false }),
    EffectsModule.forRoot([CartEffects, FoodEffects]),
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
})
export class AppModule {}
