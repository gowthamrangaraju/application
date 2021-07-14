import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  //getting value from parent to child
  @Input('childToEmitter') emitterName: any;

  @Output() childToParent = new EventEmitter<any>();

  sendToParent(name: any) {
    this.childToParent.emit(name);
  }

  constructor() { }

}
