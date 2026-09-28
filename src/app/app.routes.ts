import { Routes } from '@angular/router';
import { Feed } from './features/client/feed/feed';
import { Login } from './service/login/login';

export const routes: Routes = [
    {
        path: '',
        component: Feed
    },
    { path: 'login', component: Login },
];
