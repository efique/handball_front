import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from './components/navbar.component';
import { AuthService } from './services/auth.service';
import { NavBarService } from './services/navbar.service';
import { firstAdminService } from './services/firstadmin.service';

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
    private navbarService: NavBarService,
    private firstAdminService: firstAdminService
  ) {}

  ngOnInit(): void {
    this.firstAdminService.firstadmin().subscribe((data: any) => {});
    this.authService.isAuthenticated().subscribe((data: any) => {
      this.navbarService.isLoggedIn.next(data != null ? true : false);
    });
  }
}
