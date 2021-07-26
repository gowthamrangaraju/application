import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

// Routing Module
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule} from '../shared/shared.module';

// Component
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ChartsComponent } from './charts/charts.component';

// Services
import { AuthService } from '../authentication/services/auth.service';

@NgModule({
  declarations: [DashboardComponent, PagesComponent, ChartsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class PagesModule { }
