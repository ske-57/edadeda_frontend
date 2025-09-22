import { Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component/start.component';
import { ItemsListComponent } from './pages/items-list/items-list.component/items-list.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component/item-details.component';

export const routes: Routes = [
    { path: '', component: StartComponent, pathMatch: 'full' },

    { path: 'items', component: ItemsListComponent },
    { path: 'items/:itemId', component: ItemDetailsComponent },
];
