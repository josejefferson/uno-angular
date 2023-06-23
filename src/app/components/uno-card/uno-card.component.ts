import { Component, Input } from '@angular/core'

@Component({
  selector: 'uno-card',
  templateUrl: './uno-card.component.html',
  styleUrls: ['./uno-card.component.css']
})
export class UnoCardComponent {
  @Input() size: number = 1
  @Input() color: 'red' | 'green' | 'blue' | 'yellow' | string = ''
  @Input() icon: string = '?'
  @Input() wild: boolean = false
}
