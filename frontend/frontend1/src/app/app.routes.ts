import { Routes } from '@angular/router';
import { InternshipsComponent } from './pages/internships/internships';
import { InternshipDetailComponent } from './pages/internship-detail/internship-detail';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ApplicationsComponent } from './pages/applications/applications';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: InternshipsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'internships/:id',
    component: InternshipDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];