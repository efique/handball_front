import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../html/auth.component.html',
  styleUrl: '../css/auth.component.css',
})
export class AuthComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Output() changed = new EventEmitter();

  constructor(private authService: AuthService) {}

  submitLogin() {
    this.authService
      .login(
        this.loginForm.value.username ?? '',
        this.loginForm.value.password ?? ''
      )
      .add(() => this.changed.emit());
  }
}
