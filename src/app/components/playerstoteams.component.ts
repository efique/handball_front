import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayersToTeams } from '../interfaces/playerstoteams';
import { ToastrService } from 'ngx-toastr';
import { PlayersToTeamsService } from '../services/playerstoteams.service';
import { CommonModule } from '@angular/common';
import { Team } from '../interfaces/team';
import { Player } from '../interfaces/player';
import { Season } from '../interfaces/season';

@Component({
  selector: 'app-playerstoteams',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../html/playerstoteams.component.html',
  styleUrl: '../css/playerstoteams.component.css'
})
export class PlayersToTeamsComponent {
  playerstoteams: PlayersToTeams[] = [];
  teams: Team[] = [];
  players: Player[] = [];
  seasons: Season[] = [];
  teamError = false;
  playerError = false;
  seasonError = false;

  playerstoteamsForm = new FormGroup({
    team_id: new FormControl(0, [Validators.required]),
    player_id: new FormControl(0, [Validators.required]),
    season_id: new FormControl(0, [Validators.required]),
  });

  constructor(
    private playerstoteamsService: PlayersToTeamsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.playerstoteamsService.getAllTeams().subscribe((data) => (this.teams = data));
    this.playerstoteamsService.getAllPlayers().subscribe((data) => (this.players = data));
    this.playerstoteamsService.getAllSeasons().subscribe((data) => (this.seasons = data));
  }

  submitPlayersToTeams() {
    this.playerstoteamsForm.value.team_id == null || this.playerstoteamsForm.value.team_id < 1
      ? (this.teamError = true)
      : (this.teamError = false);

    this.playerstoteamsForm.value.player_id == null || this.playerstoteamsForm.value.player_id < 1
      ? (this.playerError = true)
      : (this.playerError = false);

    this.playerstoteamsForm.value.season_id == null || this.playerstoteamsForm.value.season_id < 1
      ? (this.seasonError = true)
      : (this.seasonError = false);

    if (
      this.teamError == false &&
      this.playerError == false &&
      this.seasonError == false
    ) {
      this.playerstoteamsService
        .submitPlayersToTeams(
          this.playerstoteamsForm.value.team_id ?? 0,
          this.playerstoteamsForm.value.player_id ?? 0,
          this.playerstoteamsForm.value.season_id ?? 0,
        )
        .subscribe({
          next: (data) => {
            this.playerstoteamsForm.reset({
              team_id: 0,
              player_id: 0,
              season_id: 0
            });
            this.toastr.success('Succes!', 'Le joueur a bien été ajouté à une équipe');
          },
          error: (err) => {
            this.toastr.error(
              'Erreur!',
              'Une erreur est survenue lors de l\'ajout du joueur à une équipe'
            ),
              console.error(err);
          },
        });
    }
  }
}
