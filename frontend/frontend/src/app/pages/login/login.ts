import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    // проверка на пустые поля
    if (!this.email || !this.password) {
      this.error = 'Fill all fields';
      return;
    }

    // фейковая проверка (потом заменим на backend)
    if (this.email === 'test@test.com' && this.password === '1234') {
      this.error = '';

      // сохраняем "сессию"
      localStorage.setItem('user', this.email);

      // переход на главную
      this.router.navigate(['/']);
    } else {
      this.error = 'Wrong email or password';
    }
  }
}