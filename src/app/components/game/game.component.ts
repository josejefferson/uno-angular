import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Socket } from 'ngx-socket-io'
import Game from 'src/app/common/game'
import { Player } from 'src/app/common/player'
import { Room } from 'src/app/common/room'
import { fadeAnimation, zoomAnimation } from 'src/app/helpers/animations'
import { ICard } from 'src/app/types/cards'

const PLAYER_MAPS = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, 0, -1, -1, -1],
  [-1, -1, 0, 1, -1, -1],
  [-1, 0, 1, -1, 2, -1],
  [-1, 0, 1, 2, 3, -1],
  [0, 1, 2, -1, 3, 4],
  [0, 1, 2, 3, 4, 5]
] as const

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [zoomAnimation, fadeAnimation()]
})
export class GameComponent {
  @Input() room!: Room
  @Input() me!: Player
  @Input() socket!: Socket
  @Input() game!: Game
  @ViewChild('myCards') myCards?: ElementRef<HTMLElement>

  selectColor?: (color: number | false) => any
  playerMap?: (typeof PLAYER_MAPS)[number]

  ngOnInit() {
    const playersLength = this.game.players.length > 7 ? 7 : this.game.players.length
    this.playerMap = PLAYER_MAPS[playersLength ?? 0]
    this.socket.on('player:addCards', this.onAddCards.bind(this))
    ;(window as any).room = this.room
    ;(window as any).me = this.me
    ;(window as any).game = this
  }

  ngOnDestroy() {
    this.socket.off('player:addCards', [this.onAddCards.bind(this)])
    this.socket.off('game:setJogador', [this.setComprouFalse.bind(this)])
  }

  onAddCards() {
    setTimeout(() => {
      this.myCards?.nativeElement.scrollTo({
        left: this.myCards.nativeElement.scrollWidth,
        behavior: 'smooth'
      })
    }, 300)
  }

  async jogar(index: number, card: ICard) {
    if (card.color === -1) {
      const result = await new Promise<number | false>((resolve) => {
        this.selectColor = resolve
      })
      this.selectColor = undefined
      if (typeof result !== 'number') return
      this.socket.emit('game:jogar', index, result)
    } else {
      this.socket.emit('game:jogar', index)
    }
  }

  comprar() {
    this.socket.emit('game:comprar')
    this.game.comprou = true
    this.socket.on('game:setJogador', this.setComprouFalse.bind(this))
    // TODO: passar a vez automaticamente
  }

  setComprouFalse() {
    this.game.comprou = false
  }

  passar() {
    this.socket.emit('game:passar')
  }
  
  gritarUNO() {
    this.socket.emit('game:gritarUNO', this.me)
  }

  getPlayer(i: number) {
    return this.sortedPlayers()[this.playerMap![i]]?.player
  }

  getVezDele(i: number) {
    return this.game.jogadorAtual.id === this.sortedPlayers()[this.playerMap![i]]?.player.id
  }

  getQuantidadeCartas(i: number) {
    const playerIndex = this.sortedPlayers()[this.playerMap![i]]?.index ?? -1
    return this.game.playerCardsCount[playerIndex]
  }

  players(filterMe = true) {
    let players = this.game?.players.map((player, index) => ({ player, index }))
    if (filterMe) players = players.filter((player) => player.player.id !== this.me.id)
    return players
  }

  sortedPlayers() {
    if (!this.game) return []
    const players = this.game.players.map((player, index) => ({ player, index }))
    const i = players.findIndex((player) => player.player.id === this.me.id)
    const firstPlayers = players.slice(i + 1)
    const lastPlayers = players.slice(0, i)
    const sortedPlayers = firstPlayers.concat(lastPlayers)
    return sortedPlayers
  }

  trackById(index: number, item: ICard) {
    return item.id
  }

  fullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }
}
