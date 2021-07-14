import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-emitter',
  templateUrl: './event-emitter.component.html',
  styleUrls: ['./event-emitter.component.scss']
})
export class EventEmitterComponent implements OnInit {
  //passing values from parent to child
  emitter: string = "send from parent";

  //Getting value from child
  childToParent(name: string) {
    this.emitter = name;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
