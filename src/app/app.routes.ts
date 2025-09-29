import { Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component/start.component';
import { ItemsListComponent } from './pages/items-list/items-list.component/items-list.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component/item-details.component';
import { CartComponent } from './pages/cart/cart.component/cart.component';
import { CreateItemComponent } from './pages/create-item/create-item.component/create-item.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component/my-orders.component';

export const routes: Routes = [
    { path: '', component: StartComponent, pathMatch: 'full' },

    { path: 'items', component: ItemsListComponent },
    { path: 'items/:itemId', component: ItemDetailsComponent },

    { path: 'cart', component: CartComponent },

    { path: 'create', component: CreateItemComponent },

    { path: 'orders', component: MyOrdersComponent },
];
