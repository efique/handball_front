import { Component, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { NavBarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HomeComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'homes';

  constructor(
    private authService: AuthService,
    private navbarService: NavBarService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((data: any) => {
      this.navbarService.isLoggedIn.next(data != null ? true : false);
    });
  }
}
