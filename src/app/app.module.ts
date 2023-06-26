import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LobbyComponent } from './components/lobby/lobby.component'
import { UnoCardComponent } from './components/uno-card/uno-card.component'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { RoomsComponent } from './pages/rooms/rooms.component'
import { TestComponent } from './pages/test/test.component';
import { SetupComponent } from './pages/setup/setup.component'
import { ToastrModule } from 'ngx-toastr'
import { env } from 'src/environments/environment';
import { GameComponent } from './components/game/game.component';
import { PlayerSlotComponent } from './components/player-slot/player-slot.component';
import { SelectColorComponent } from './components/select-color/select-color.component'

const socketConfig: SocketIoConfig = {
  url: env.api + '/',
  options: {
    transports: ['websocket'],
    withCredentials: true
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomsComponent,
    UnoCardComponent,
    TestComponent,
    RoomComponent,
    LobbyComponent,
    SetupComponent,
    GameComponent,
    PlayerSlotComponent,
    SelectColorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(socketConfig),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
