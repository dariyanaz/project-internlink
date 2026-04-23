import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  email = '';
  first_name = '';
  last_name = '';
  password = '';
  password2 = '';
  error = '';
  loading = false;

  onSubmit(): void {
    this.error = '';

    if (!this.username || !this.email || !this.password || !this.password2) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (this.password !== this.password2) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    this.authService.register({
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      password2: this.password2
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        console.log('REGISTER ERROR:', err);
        console.log('REGISTER ERROR BODY:', err?.error);

        const backendError = err?.error;

        this.error =
          backendError?.username?.[0] ||
          backendError?.email?.[0] ||
          backendError?.password?.[0] ||
          backendError?.detail ||
          'Registration failed.';
      }
    });
  }
}
