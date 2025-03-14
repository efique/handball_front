import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarService } from '../services/navbar.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css',
})
export class NavbarComponent {
  @Input() currentLoggedIn = false;

  constructor(
    private navbarService: NavBarService,
    private authService: AuthService,
    private playerService: PlayerService
  ) { }

  state = false;
  toggle = false;

  ngOnInit(): void {
    this.navbarService.currentLoggedIn.subscribe(
      (isLoggedIn) => (this.currentLoggedIn = isLoggedIn)
    );
  }

  addPlayer() {
    this.playerService.isPlayerPage.next(false);
  }

  showPlayer() {
    this.playerService.isPlayerPage.next(true);
  }

  toggleState() {
    this.state = !this.state;
    this.toggle = true;
  }

  onMouseLeave() {
    this.state = false;
    this.toggle = false;
  }

  onMouseEnter() {
    this.state = true;
    this.toggle = false;
  }

  submitLogout() {
    this.authService.logout();
  }
}
