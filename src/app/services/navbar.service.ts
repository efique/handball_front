import {
  Component,
  EventEmitter,
  Input,
  Output,
  Injectable,
} from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedIn.asObservable();

  constructor() {}
}
