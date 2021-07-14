import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import {EventEmitterComponent} from './event-emitter.component';
import {ChildComponent} from './child/child.component';

const routes: Routes = [
  {
    path: '',
    component: EventEmitterComponent,
    children: [
      {
        path: 'child',
        component: ChildComponent,
      },
      { path: '', redirectTo: 'EventEmitterComponent', pathMatch: 'full' },
      { path: '**', redirectTo: 'EventEmitterComponent'  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventEmitterRoutingModule { }
