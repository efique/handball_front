import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isLoggedIn = false;

  @Output() changed = new EventEmitter();

  constructor(private authService: AuthService) {}

  changeIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  submitLogout() {
    this.authService.logout().add(() => this.changed.emit());
  }
}
