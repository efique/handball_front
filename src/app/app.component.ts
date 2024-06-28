import { Component, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';

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
  isLoggedIn = false;
  user: any = '';

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.user = localStorage.getItem('user');
      this.isLoggedIn = JSON.parse(this.user) ? true : false;
    }
  }

  changeIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onActivate(componentRef: any) {
    if (componentRef.constructor.name == '_AuthComponent') {
      componentRef.changed.subscribe((res: any) => {
        this.changeIsLoggedIn();
      });
    }
  }
}
