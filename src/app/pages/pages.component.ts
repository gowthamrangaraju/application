import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// services
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: any;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {
    // currentUserEmail
    this.user = localStorage.getItem('currentUserEmail');
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.userLogout();
  }
}
