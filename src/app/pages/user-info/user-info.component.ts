import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  title: string;

  constructor(
    public authService: AuthService,
  ) {
    this.title = "User Info";
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.userLogout();
  }

}
