import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { SeasonComponent } from './season/season.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'player',
    component: PlayerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'team',
    component: TeamComponent,
    canActivate: [authGuard],
  },
  {
    path: 'match',
    component: MatchComponent,
    canActivate: [authGuard],
  },
  {
    path: 'season',
    component: SeasonComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotfoundComponent },
];
