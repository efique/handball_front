import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PlayerComponent } from './components/player.component';
import { TeamComponent } from './components/team.component';
import { MatchComponent } from './components/match.component';
import { SeasonComponent } from './components/season.component';
import { NotfoundComponent } from './components/notfound.component';
import { AuthComponent } from './components/auth.component';
import { authGuard } from './guards/auth.guard';
import { PlayersToTeamsComponent } from './components/playerstoteams.component';

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
    path: 'playerstoteams',
    component: PlayersToTeamsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
    // canActivate: [authGuard],
  },
  { path: '**', component: NotfoundComponent },
];
