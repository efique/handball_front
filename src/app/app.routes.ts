import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { SeasonComponent } from './season/season.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'team', component: TeamComponent },
  { path: 'match', component: MatchComponent },
  { path: 'season', component: SeasonComponent },
  { path: '**', component: NotfoundComponent },
];
