import { Routes } from '@angular/router';
import { Feed } from './features/client/feed/feed';
import { Login } from './features/client/login/login';

export const routes: Routes = [
    {
        path: '',
        component: Feed
    },
    { 
        path: 'login', 
        component: Login },
        
    { 
        path: 'login/:id', 
        component: Login },
];
