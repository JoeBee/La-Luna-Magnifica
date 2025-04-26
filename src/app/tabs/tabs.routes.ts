import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'round-earth',
        loadComponent: () =>
          import('../pages/round-earth/round-earth.page').then((m) => m.RoundEarthPage),
      },
      {
        path: 'flat-earth',
        loadComponent: () =>
          import('../pages/flat-earth/flat-earth.page').then((m) => m.FlatEarthPage),
      },
      {
        path: 'white-paper',
        loadComponent: () =>
          import('../pages/white-paper/white-paper.page').then((m) => m.WhitePaperPage),
      },
      {
        path: 'reference',
        loadComponent: () =>
          import('../pages/reference/reference.page').then((m) => m.ReferencePage),
      },
      {
        path: '',
        redirectTo: '/tabs/round-earth',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/round-earth',
    pathMatch: 'full',
  },
];
