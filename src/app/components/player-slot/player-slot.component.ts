import { Component, Input } from '@angular/core'
import { Player } from 'src/app/common/player'

@Component({
  selector: 'app-player-slot',
  templateUrl: './player-slot.component.html',
  styleUrls: ['./player-slot.component.css']
})
export class PlayerSlotComponent {
  @Input() player?: Player
  @Input() vezDele: boolean = false
  @Input() quantidadeCartas?: number

  cards() {
    return Array(this.quantidadeCartas || 0).fill(0)
  }
}
