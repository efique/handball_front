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
import { PaginatorIntl } from './paginator.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginatorIntl],
  templateUrl: '../html/player.component.html',
  styleUrl: '../css/player.component.css',
})
export class PlayerComponent {
  @Input() currentPlayerPage = true;
  players: Player[] = [];
  firstNameError = false;
  lastNameError = false;
  roleError = false;
  pageLength = 200;
  valueEmittedFromChildComponent: any;

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
        this.playerService.getAllPlayers(10, 0).subscribe((data) => (this.players = data.data, this.pageLength = data.count));
      }
    }
    );
  }

  paginatorEvent(valueEmitted: any) {
    this.valueEmittedFromChildComponent = valueEmitted;

    this.playerService.getAllPlayers(valueEmitted.pageSize, (valueEmitted.currentPage * valueEmitted.pageSize)).subscribe((data) => (this.players = data.data, this.pageLength = data.count));
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
