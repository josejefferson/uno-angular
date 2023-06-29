import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Socket } from 'ngx-socket-io'
import { seedColor } from 'src/app/helpers/seed-color'
import { env } from 'src/environments/environment'

interface IRoom {
  id: string
  isPublic: boolean
  started: boolean
  owner: string
  players: any[]
  currentGame: any
  currentGameIndex: number
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  seedColor = seedColor

  name: string = localStorage.getItem('name') || ''
  sessionID: string = localStorage.getItem('sessionID') || Math.random().toString()

  rooms: IRoom[] = []
  loading = true
  creatingRoom = false
  error: any = null
  timer: any

  constructor(private http: HttpClient, private socket: Socket) {
    this.getRooms()
    this.timer = setInterval(() => this.getRooms(true), 5000)
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

  getRooms(hideLoading = false) {
    if (!hideLoading) this.loading = true
    return this.http.get<IRoom[]>(env.api + '/api/room/').subscribe({
      next: (value) => (this.rooms = value),
      error: (err) => (this.error = err),
      complete: () => (this.loading = false)
    })
  }

  createRoom() {
    this.creatingRoom = true
    this.http
      .post(env.api + `/api/room/?sessionID=${this.sessionID}&name=${this.name}`, {})
      .subscribe({
        next: () => this.getRooms(true),
        error: (err) => alert(err.message),
        complete: () => (this.creatingRoom = false)
      })
  }

  inRoom(room: IRoom) {
    return room.players.find((player) => player.id === this.sessionID)
  }

  roomDisabled(room: IRoom) {
    return !!room.currentGame && !this.inRoom(room)
  }
}
