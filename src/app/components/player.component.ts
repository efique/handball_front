import { Component, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../interfaces/player';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../html/player.component.html',
  styleUrl: '../css/player.component.css',
})
export class PlayerComponent {
  @Input() currentPlayerPage = true;
  players: Player[] = [];
  firstNameError = false;
  lastNameError = false;
  roleError = false;

  playerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  rolesEnum = [
    { label: 'player', name: 'Joueur' },
    { label: 'keeper', name: 'Gardien' },
  ];

  constructor(
    private playerService: PlayerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.playerService.currentPlayerPage.subscribe((isPlayerPage) => {
      this.currentPlayerPage = isPlayerPage
      if (!this.currentPlayerPage) {
        this.playerService.getAllPlayers().subscribe((data) => (this.players = data));
        // this.players.forEach(element => {
        //   element.role = this.rolesEnum.find(role=>role.label === element.role)?.name
        // });
      }
    }
    );
  }

  submitPlayer() {
    this.playerForm.value.firstName == ''
      ? (this.firstNameError = true)
      : (this.firstNameError = false);

    this.playerForm.value.lastName == ''
      ? (this.lastNameError = true)
      : (this.lastNameError = false);

    this.playerForm.value.role == ''
      ? (this.roleError = true)
      : (this.roleError = false);

    if (
      this.firstNameError == false &&
      this.lastNameError == false &&
      this.roleError == false
    ) {
      this.playerService
        .submitPlayer(
          this.playerForm.value.firstName ?? '',
          this.playerForm.value.lastName ?? '',
          this.playerForm.value.role ?? ''
        )
        .subscribe({
          next: (data) => {
            this.playerForm.reset({
              firstName: '',
              lastName: '',
              role: '',
            });
            this.toastr.success('Succes!', 'Le joueur a bien été crée');
          },
          error: (err) => {
            this.toastr.error(
              'Erreur!',
              'Une erreur est survenue lors de la création du joueur'
            ),
              console.error(err);
          },
        });
    }
  }
}
