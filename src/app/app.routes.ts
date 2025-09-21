import { Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component/start.component';

export const routes: Routes = [
    { path: '', component: StartComponent, pathMatch: 'full' },
];
