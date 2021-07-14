import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing Module
import { EventEmitterRoutingModule } from './event-emitter-routing.module';

// Module
import { ChildComponent } from './child/child.component';

//Component 
import { EventEmitterComponent } from './event-emitter.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EventEmitterComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    EventEmitterRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class EventEmitterModule { }
