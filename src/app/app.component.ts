import { Component } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AuthService } from './authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
    // pages redirection if the user already loggedin
    if (localStorage.getItem('currentUserEmail')) {
      this.router.navigateByUrl('pages/dashboard');
    }
  }


}
