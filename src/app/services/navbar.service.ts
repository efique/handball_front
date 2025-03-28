import {
  Injectable,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedIn.asObservable();

  constructor() { }
}
