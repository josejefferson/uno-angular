import { Component, Input } from '@angular/core'
import { fadeAnimation } from 'src/app/helpers/animations'

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css'],
  animations: [fadeAnimation()]
})
export class SelectColorComponent {
  @Input() select?: (color: number | false) => any

  s(i: number | false) {
    this.select?.(i)
  }
}
