import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css']
})
export class SelectColorComponent {
  @Input() select?: (color: number|false) => any

  s(i:number|false) {
    this.select?.(i)
  }
}
