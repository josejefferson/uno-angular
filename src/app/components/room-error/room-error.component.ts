import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-error',
  templateUrl: './room-error.component.html',
  styleUrls: ['./room-error.component.css']
})
export class RoomErrorComponent {
  @Input() err!: any
}
