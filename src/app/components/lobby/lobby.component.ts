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
  sessionID: string = localStorage.getItem('sessionID') || Math.random().toString()

  startGame() {
    this.starting = true
    this.socket
      .timeout(5000)
      .emit('room:startGame', (err: Error, error: string | null, ok: boolean) => {
        this.starting = false
        if (err || error) return alert(err?.message || error)
      })
  }

  get players() {
    const sortedPlayers = [...this.room.players].sort((a, b) => {
      return b.score - a.score
    })

    const places = [
      ...new Set(sortedPlayers.map((player) => player.score).filter((score) => score > 0))
    ]

    const PLACES: any = { [1]: '🥇', [2]: '🥈', [3]: '🥉' }

    const players = sortedPlayers.map((player: any) => {
      const rawPlace = places.indexOf(player.score) + 1
      const place = rawPlace > 3 ? null : rawPlace < 1 ? null : rawPlace
      player.place = PLACES[place as any] || ''
      return player
    })

    return players as unknown as (Player & { place: string })[]
  }
}
