import { Component, Input } from '@angular/core'
import { ICard } from 'src/app/types/cards'

const ICONS: any = {
  REVERSE: '\\f2f1',
  SKIP: '\\f05e',
  DRAW2: '+2',
  WILD: '',
  WILDDRAW4: '+4'
}

const COLORS = ['red', 'yellow', 'blue', 'green'] as const

@Component({
  selector: 'uno-card',
  templateUrl: './uno-card.component.html',
  styleUrls: ['./uno-card.component.css']
})
export class UnoCardComponent {
  @Input() back = false
  @Input() size?: number
  @Input() card!: ICard
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'gray'

  get iconText() {
    if (!this.card) return ''
    return ICONS[this.card.icon] ?? this.card.icon ?? '?'
  }

  ngOnInit() {
    if (this.back) this.color = 'gray'
    if (!this.card) return
    const color = this.back ? 'gray' : COLORS[this.card.wildColor ?? this.card.color]
    this.color = color
  }

  ngOnChanges() {
    this.ngOnInit()
  }
}
