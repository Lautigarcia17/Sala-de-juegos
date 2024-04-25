import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent},
    { path: 'aboutMe', component: AboutMeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: PageNotFoundComponent },
];

