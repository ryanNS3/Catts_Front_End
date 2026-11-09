import { Routes } from '@angular/router';
import { Feed } from './features/client/feed/feed';
import { LoginAdotante } from './features/client/login/login-adotante/login-adotante';
export const routes: Routes = [
  {
    path: '',
    component: Feed,
  },
  {
    path: 'login',
    component: LoginAdotante,
  },

  {
    path: 'login/:id',
    component: LoginAdotante,
  },
];
