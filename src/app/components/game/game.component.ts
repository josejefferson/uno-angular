import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
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

  centerCardSize: number = 1.5
  myCardSize: number = 1

  readonly breakpoint$ = this.breakpointObserver.observe([
    Breakpoints.Large,
    Breakpoints.Medium,
    Breakpoints.Small,
    '(min-width: 640px)'
  ])

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched('(min-width: 641px)')) {
      this.centerCardSize = 1.5
      this.myCardSize = 1
    } else {
      this.centerCardSize = 1
      this.myCardSize = 0.7
    }
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpoint$.subscribe(() => this.breakpointChanged())
    const playersLength = this.players()?.length > 7 ? 7 : this.players()?.length
    this.playerMap = PLAYER_MAPS[playersLength ?? 0]
    this.socket.on('player:addCards', this.onAddCards.bind(this))
    ;(window as any).room = this.room
    ;(window as any).me = this.me
    ;(window as any).game = this
  }

  ngOnDestroy() {
    this.socket.off('player:addCards', [this.onAddCards.bind(this)])
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
    this.socket.on('game:setJogador', () => {
      this.game.comprou = false
    })
  }

  passar() {
    this.socket.emit('game:passar')
  }

  getPlayer(i: number) {
    return this.players()[this.playerMap![i]]?.player
  }

  getVezDele(i: number) {
    return this.game.jogadorAtual.id === this.players()[this.playerMap![i]]?.player?.id
  }

  getQuantidadeCartas(i: number) {
    const playerIndex = this.players()[this.playerMap![i]]?.index ?? -1
    return this.game.playerCardsCount[playerIndex]
  }

  players(filterMe = true) {
    let players = this.game?.players.map((player, index) => ({ player, index }))
    if (filterMe) players = players.filter((player) => player.player.id !== this.me.id)
    return players
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
