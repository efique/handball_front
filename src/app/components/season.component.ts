import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeasonService } from '../services/season.service';
import { Season } from '../interfaces/season';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-season',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../html/season.component.html',
  styleUrl: '../css/season.component.css',
})
export class SeasonComponent {
  seasons: Season[] = [];
  nameError = false;
  victoryError = false;
  drawError = false;
  loseError = false;

  seasonForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    victory: new FormControl(0, [Validators.required]),
    draw: new FormControl(0, [Validators.required]),
    lose: new FormControl(0, [Validators.required]),
  });

  constructor(
    private seasonService: SeasonService,
    private toastr: ToastrService
  ) {}

  submitSeason() {
    this.seasonForm.value.name == ''
      ? (this.nameError = true)
      : (this.nameError = false);

    this.seasonForm.value.victory == null
      ? (this.victoryError = true)
      : (this.victoryError = false);

    this.seasonForm.value.draw == null
      ? (this.drawError = true)
      : (this.drawError = false);

    this.seasonForm.value.lose == null
      ? (this.loseError = true)
      : (this.loseError = false);

    if (
      this.nameError == false &&
      this.victoryError == false &&
      this.drawError == false &&
      this.loseError == false
    ) {
      this.seasonService
        .submitSeason(
          this.seasonForm.value.name ?? '',
          this.seasonForm.value.victory ?? 0,
          this.seasonForm.value.draw ?? 0,
          this.seasonForm.value.lose ?? 0
        )
        .subscribe({
          next: (data) => {
            this.seasonForm.reset({ name: '', victory: 0, draw: 0, lose: 0 });
            this.toastr.success('Succes!', 'La saison a bien été crée');
          },
          error: (err) => {
            this.toastr.error(
              'Erreur!',
              'Une erreur est survenue lors de la création de la saison'
            ),
              console.error(err);
          },
        });
    }
  }
}
