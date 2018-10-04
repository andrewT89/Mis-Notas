import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platzi overFlow';

  constructor(private _authService: AuthService) {}

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  fullName() {
    return this._authService.currentUser.fullName();
  }

  logout() {
    this._authService.logout();
  }
}
