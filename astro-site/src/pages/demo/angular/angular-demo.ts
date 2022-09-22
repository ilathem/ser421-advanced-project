import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgIf],
  template: `
    <p>This is my list of things</p>

    <p *ngIf="show">{{todoText}}</p>

    <button (click)="toggle()">Toggle</button>
  `,
})
export class TodoComponent {
  @Input() todoText = 'Just do it';

  show = false;

  toggle() {
    this.show = !this.show;
  }
}
