import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'reference',
    loadComponent: () => import('./pages/reference/reference.page').then( m => m.ReferencePage)
  },
];
