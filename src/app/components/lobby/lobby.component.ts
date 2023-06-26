import { Component, Input } from '@angular/core'
import { Socket } from 'ngx-socket-io'
import { Player } from 'src/app/common/player'
import { Room } from 'src/app/common/room'
import { seedColor } from 'src/app/helpers/seed-color'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  seedColor = seedColor

  @Input() room!: Room
  @Input() me!: Player
  @Input() socket!: Socket
  starting = false

  startGame() {
    this.starting = true
    this.socket.timeout(5000).emit('room:startGame', (err: Error, error: string | null, ok: boolean) => {
      this.starting = false
      if (err || error) return alert(err?.message || error)
    })
  }
}
