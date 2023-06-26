import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Socket, SocketIoConfig } from 'ngx-socket-io'
import { IPlayer, Player } from 'src/app/common/player'
import { IRoom, Room } from 'src/app/common/room'

const socketConfig = (roomID: string, sessionID: string, name: string): SocketIoConfig => ({
  url: `http://vps40806.publiccloud.com.br:4000/room/${roomID}?sessionID=${sessionID}&name=${name}`,
  options: {
    transports: ['websocket'],
    withCredentials: true
  }
})

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  socket: Socket
  error: any
  starting = false
  me = new Player({ id: '', name: 'Jogador' })
  room?: Room
  roomID: string

  constructor(private route: ActivatedRoute) {
    const roomID = this.route.snapshot.queryParamMap.get('id') || ''
    const sessionID =
      this.route.snapshot.queryParamMap.get('sessionID') || localStorage.getItem('sessionID')
    const name = this.route.snapshot.queryParamMap.get('name') || localStorage.getItem('name')

    this.roomID = roomID
    this.socket = new Socket(socketConfig(roomID, sessionID || 'a', name || 'João'))

    this.socket.on('connect_error', (err: any) => {
      alert('Erro ao conectar: ' + (err?.message || err))
      // error = err
    })

    this.socket.on('connect', () => {
      // console.log('Conectado!')
    })

    this.socket.on('disconnect', (reason: string) => {
      alert('Conexão perdida, motivo: ' + reason)
    })

    this.socket.on('warning', (err: any) => {
      console.warn('AVISO: ' + (err?.message || err))
    })

    this.socket.on('error', (err: any) => {
      alert('ERRO: ' + (err?.message || err))
    })

    this.socket.on('message', (message: string) => {
      alert(message)
    })

    this.socket.on('player:data', (playerData: IPlayer) => {
      this.me = new Player(playerData)
    })

    this.socket.on('room:data', (roomData: IRoom) => {
      this.room = new Room(roomData)
    })

    this.socket.onAny((event, ...args) => {
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
    })
  }
}

function runAction(entity: any, actionName: string, args: any[]) {
  if (!entity) return
  const action = entity[actionName]
  if (!action) return
  return action.bind(entity)(...args)
}
