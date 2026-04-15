import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Internships } from './pages/internships/internships';

export const routes: Routes = [
  { path: '', component: Internships},
  { path: 'login', component: Login },
  { path: 'register', component: Register},
];