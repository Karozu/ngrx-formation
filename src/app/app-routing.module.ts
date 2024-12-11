import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UserSignalComponent } from './components/user-signal/user-signal.component';

export const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'user',
    component: UserSignalComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
