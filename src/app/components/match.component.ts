import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Match } from '../interfaces/match';
import { MatchService } from '../services/match.service';
import { ToastrService } from 'ngx-toastr';
import { Team } from '../interfaces/team';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../html/match.component.html',
  styleUrl: '../css/match.component.css',
})
export class MatchComponent {
  matchs: Match[] = [];
  teams: Team[] = [];
  versusError = false;
  teamError = false;

  matchForm = new FormGroup({
    team_id: new FormControl(0, [Validators.required]),
    versus: new FormControl('', [Validators.required]),
    date: new FormControl(new Date().toISOString().substring(0, 10), [
      Validators.required,
    ]),
    isHome: new FormControl(false, [Validators.required]),
  });

  constructor(
    private matchService: MatchService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.matchService.getAllTeams().subscribe((data) => (this.teams = data));
  }

  submitMatch() {
    this.matchForm.value.team_id == null || this.matchForm.value.team_id < 1
      ? (this.teamError = true)
      : (this.teamError = false);

    this.matchForm.value.versus == ''
      ? (this.versusError = true)
      : (this.versusError = false);

    if (this.teamError == false && this.versusError == false) {
      this.matchService
        .submitMatch(
          this.matchForm.value.team_id ?? 0,
          this.matchForm.value.versus ?? '',
          (typeof this.matchForm.value.date == 'string'
            ? new Date(this.matchForm.value.date)
            : this.matchForm.value.date) ?? new Date(),
          this.matchForm.value.isHome ?? false
        )
        .subscribe({
          next: (data) => {
            this.matchForm.reset({
              team_id: 0,
              versus: '',
              date: new Date().toISOString().substring(0, 10),
              isHome: false,
            });
            this.toastr.success('Succes!', 'Le match a bien été crée');
          },
          error: (err) => {
            this.toastr.error(
              'Erreur!',
              'Une erreur est survenue lors de la création du match'
            ),
              console.error(err);
          },
        });
    }
  }
}
