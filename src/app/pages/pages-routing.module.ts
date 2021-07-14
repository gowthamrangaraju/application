import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ChartsComponent } from './charts/charts.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent
      },
      {
        path: 'usermanagement',
        component: UserInfoComponent
      },
      {
        path: 'eventemitter',
        loadChildren: () => import('./event-emitter/event-emitter.module')
          .then(m => m.EventEmitterModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: DashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
