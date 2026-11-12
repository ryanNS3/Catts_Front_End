import { Routes } from '@angular/router';
import { Feed } from './features/client/feed/feed';
import { LoginAdotante } from './features/client/login/login-adotante/login-adotante';
import { LoginOng } from './features/client/login/login-ong/login-ong';
import { EscolherPerfil } from './features/client/login/escolher-perfil/escolher-perfil';

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

  { path: 'login-ong',
    component: LoginOng,
  },

  { path: 'escolher-perfil',
    component: EscolherPerfil,
  },

];
