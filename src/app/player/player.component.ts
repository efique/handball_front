import { Component, inject } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../interfaces/player';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
  players: Player[] = [];

  playerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    role: new FormControl(''),
  });

  roles = [
    { label: 'player', name: 'Joueur' },
    { label: 'keeper', name: 'Gardien' },
  ];

  constructor(private playerService: PlayerService) {}

  // ngOnInit() {
  //   this.playerService.getAllPlayers().subscribe((data) => console.log(data));
  // }

  submitPlayer() {
    this.playerService.submitPlayer(
      this.playerForm.value.firstName ?? '',
      this.playerForm.value.lastName ?? '',
      this.playerForm.value.role ?? ''
    );
  }
}
