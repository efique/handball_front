import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Team } from '../interfaces/team';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../html/team.component.html',
  styleUrl: '../css/team.component.css',
})
export class TeamComponent {
  teams: Team[] = [];
  nameError = false;

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private teamService: TeamService,
    private toastr: ToastrService
  ) {}

  submitTeam() {
    this.teamForm.value.name == ''
      ? (this.nameError = true)
      : (this.nameError = false);

    if (this.nameError == false) {
      this.teamService.submitTeam(this.teamForm.value.name ?? '').subscribe({
        next: (data) => {
          this.teamForm.reset();
          this.toastr.success('Succes!', "L'équipe a bien été crée");
        },
        error: (err) => {
          this.toastr.error(
            'Erreur!',
            "Une erreur est survenue lors de la création de l'équipe"
          ),
            console.error(err);
        },
      });
    }
  }
}
