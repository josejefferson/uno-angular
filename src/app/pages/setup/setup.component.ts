import { Component } from '@angular/core'
import { seedColor } from 'src/app/helpers/seed-color'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  seedColor = seedColor

  name: string = localStorage.getItem('name') || ''
  sessionID: string = localStorage.getItem('sessionID') || Math.random().toString()

  constructor() {
    this.setSessionID(this.sessionID)
  }

  setName(name: string) {
    localStorage.setItem('name', name)
    this.name = name
  }

  setSessionID(sessionID: string) {
    localStorage.setItem('sessionID', sessionID)
    this.sessionID = sessionID
  }

  generateRandomSessionID() {
    const id = Math.random().toString()
    this.setSessionID(id)
  }
}
