import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
        {
          path: '',
          loadComponent: () => import('./home/home.component'),
        },
        {
          path: 'ahorcado',
          loadComponent: () => import('../games/ahorcado/ahorcado.component'),
        },
        {
            path: 'mayorOMenor',
            loadComponent: () => import('../games/mayor-o-menor/mayor-o-menor.component'),
        }
    ]
  },


];
