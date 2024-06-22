import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { alreadyLoggedInGuard } from './guards/already-logged-in.guard';

export const routes: Routes = [
  { 
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
  {
    path: 'login', canActivate : [alreadyLoggedInGuard],
    loadComponent: () => import('./components/login/login.component'),
  },
  {
    path: 'aboutMe',
    loadComponent: () => import('./components/about-me/about-me.component'),
  },
  {
    path: 'register', canActivate : [alreadyLoggedInGuard],
    loadComponent: () => import('./components/register/register.component'),
  },
  {
    path: 'home', 
    canActivate : [authGuard],
    loadChildren: () =>
      import('./components/home/home.routes').then(
        (m) => m.routes
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
