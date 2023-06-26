import { Component, Input } from '@angular/core'
import { Socket } from 'ngx-socket-io'
import Game from 'src/app/common/game'
import { Player } from 'src/app/common/player'
import { Room } from 'src/app/common/room'
import { ICard } from 'src/app/types/cards'

const PLAYER_MAPS = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, 0, -1, -1, -1],
  [-1, -1, 0, 1, -1, -1],
  [-1, 0, 1, -1, 2, -1],
  [-1, 0, 1, 2, 3, -1],
  [0, 1, 2, 3, 4, -1],
  [0, 1, 2, 3, 4, 5]
] as const

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() room!: Room
  @Input() me!: Player
  @Input() socket!: Socket
  @Input() game!: Game
  playerMap?: (typeof PLAYER_MAPS)[number]

  ngOnInit() {
    const playersLength = this.players()?.length > 7 ? 7 : this.players()?.length
    this.playerMap = PLAYER_MAPS[playersLength ?? 0]
  }

  jogar(index: number, card: ICard) {
    // if (card.color === -1)
    //   Swal.fire({
    //     title: 'Selecione a cor',
    //     input: 'radio',
    //     inputOptions: {
    //       [0]: 'Vermelho',
    //       [1]: 'Amarelo',
    //       [2]: 'Azul',
    //       [3]: 'Verde'
    //     }
    //   }).then((result) => {
    //     if (!result.value) return
    //     dispatch('jogar', [index, result.value])
    //   })
    // else dispatch('jogar', [index])
  }

  comprar() {
    // dispatch('comprar')
  }

  passar() {
    // dispatch('passar')
  }

  getPlayer(i: number) {
    return this.players()[this.playerMap![i]]?.player
  }

  getVezDele(i: number) {
    return this.game.jogadorAtual.id === this.players()[this.playerMap![i]]?.player?.id
  }

  getQuantidadeCartas(i: number) {
    const playerIndex = this.players(false)[this.playerMap![i]]?.index ?? -1
    return this.game.playerCardsCount[playerIndex]
  }

  players(filterMe = true) {
    let players = this.game?.players.map((player, index) => ({ player, index }))
    if (filterMe) players = players.filter((player) => player.player.id !== this.me.id)
    return players
  }
}
