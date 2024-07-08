import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarService } from '../services/navbar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() currentLoggedIn = false;

  constructor(
    private navbarService: NavBarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.navbarService.currentLoggedIn.subscribe(
      (isLoggedIn) => (this.currentLoggedIn = isLoggedIn)
    );
  }

  submitLogout() {
    this.authService.logout();
  }
}
