import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Socket, SocketIoConfig } from 'ngx-socket-io'
import { ToastrService } from 'ngx-toastr'
import { IPlayer, Player } from 'src/app/common/player'
import { IRoom, Room } from 'src/app/common/room'
import { fadeAnimation } from 'src/app/helpers/animations'
import { ToastService } from 'src/app/services/toast.service'
import { env } from 'src/environments/environment'

const socketConfig = (roomID: string, sessionID: string, name: string): SocketIoConfig => ({
  url: `${env.api}/room/${roomID}?sessionID=${sessionID}&name=${name}`,
  options: {
    transports: ['websocket'],
    withCredentials: true
  }
})

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [fadeAnimation()]
})
export class RoomComponent {
  socket: Socket
  error?: string
  me = new Player({ id: '', name: 'Jogador' })
  room?: Room
  roomID: string

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private toastService: ToastService<string>
  ) {
    const roomID = this.route.snapshot.queryParamMap.get('id') || ''
    const sessionID =
      this.route.snapshot.queryParamMap.get('sessionID') || localStorage.getItem('sessionID')
    const name = this.route.snapshot.queryParamMap.get('name') || localStorage.getItem('name')

    this.roomID = roomID
    this.socket = new Socket(socketConfig(roomID, sessionID || 'a', name || 'João'))

    this.socket.on('connect_error', this.connect_error.bind(this))
    this.socket.on('connect', this.connect.bind(this))
    this.socket.on('disconnect', this.disconnect.bind(this))
    this.socket.on('warning', this.warning.bind(this))
    this.socket.on('error', this.errorr.bind(this))
    this.socket.on('message', this.message.bind(this))
    this.socket.on('player:data', this.player_data.bind(this))
    this.socket.on('game:gritarUNO', this.game_gritarUNO.bind(this))
    this.socket.on('room:data', this.room_data.bind(this))
    this.socket.on('room:startGame', this.room_startGame.bind(this))
    this.socket.on('room:setPlayerOnline', this.room_setPlayerOnline.bind(this))
    this.socket.ioSocket.onAny(this.socketEvent.bind(this))
  }

  ngOnDestroy() {
    this.socket.off('connect_error', [this.connect_error.bind(this)])
    this.socket.off('connect', [this.connect.bind(this)])
    this.socket.off('disconnect', [this.disconnect.bind(this)])
    this.socket.off('warning', [this.warning.bind(this)])
    this.socket.off('error', [this.errorr.bind(this)])
    this.socket.off('message', [this.message.bind(this)])
    this.socket.off('player:data', [this.player_data.bind(this)])
    this.socket.off('room:data', [this.room_data.bind(this)])
    this.socket.off('room:startGame', [this.room_startGame.bind(this)])
    this.socket.off('room:setPlayerOnline', [this.room_setPlayerOnline.bind(this)])
    this.socket.ioSocket.offAny([this.socketEvent.bind(this)])
  }

  connect_error(err: any) {
    this.error = err?.message || err
  }

  connect() {}

  disconnect(reason: string) {
    this.toastr.error(reason, 'Conexão perdida, motivo:')
  }

  warning(err: any) {
    this.toastr.warning(err?.message || err, 'AVISO', {})
  }

  errorr(err: any) {
    this.toastr.error(err?.message || err, 'ERRO')
  }

  message(message: string) {
    this.toastService.showToast(message)
  }

  player_data(playerData: IPlayer) {
    this.me = new Player(playerData)
  }

  game_gritarUNO(player: IPlayer) {
    this.toastr.info(`${player.name} gritou UNO`)
  }

  room_data(roomData: IRoom) {
    this.room = new Room(roomData)
  }

  room_startGame() {
    this.toastService.showToast('O jogo começou')
  }

  room_setPlayerOnline(player: IPlayer) {
    this.toastr.info(`${player.name} ${player.online ? 'está online' : 'ficou offline'}`)
  }

  socketEvent(event: string, ...args: any[]) {
    // console.log(event, ...args)
    const [entity, action] = event.split(':')
    switch (entity) {
      case 'room':
        runAction(this.room, action, args)
        // room = room
        break
      case 'player':
        runAction(this.me, action, args)
        // player = player
        break
      case 'game':
        runAction(this.room!.currentGame, action, args)
        // room = room
        break
    }
  }
}

function runAction(entity: any, actionName: string, args: any[]) {
  if (!entity) return
  const action = entity[actionName]
  if (!action) return
  return action.bind(entity)(...args)
}
