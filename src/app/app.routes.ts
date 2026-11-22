import { Routes } from '@angular/router';
import { Feed } from './features/client/feed/feed';
import { LoginAdotante } from './features/client/login/login-adotante/login-adotante';
import { LoginOng } from './features/client/login/login-ong/login-ong';
import { EscolherPerfil } from './features/client/login/escolher-perfil/escolher-perfil';
import { LoginGoogle } from './features/client/login/login-google/login-google';
import { InicioAdmin } from './features/admin/inicio-admin/inicio-admin';
import { GatosAdmin } from './features/admin/gatos-admin/gatos-admin';
import { DetalheGatoAdmin } from './features/admin/detalhe-gato-admin/detalhe-gato-admin';
import { DetalheSolicitacaoAdmin } from './features/admin/detalhe-solicitacao-admin/detalhe-solicitacao-admin';
import { AdicionarGatoAdmin } from './features/admin/adicionar-gato-admin/adicionar-gato-admin';

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

  { path: 'login-google',
    component: LoginGoogle,
  },

  {path: 'admin',
    component: InicioAdmin,
  },

  {path: 'admin/solicitacoes/:id',
    component: DetalheSolicitacaoAdmin,
  },

  {path: 'admin/gatos',
    component: GatosAdmin,
  },

  {path: 'admin/gatos/adicionar',
    component: AdicionarGatoAdmin,
  },

  {path: 'admin/gatos/:id',
    component: DetalheGatoAdmin,
  }
  
];
