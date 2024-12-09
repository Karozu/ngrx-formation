import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
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
