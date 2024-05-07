import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { 
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component'),
  },
  {
    path: 'aboutMe',
    loadComponent: () => import('./components/about-me/about-me.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component'),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.routes').then(
        (m) => m.routes
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
