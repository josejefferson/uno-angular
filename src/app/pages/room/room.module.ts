import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { GameComponent } from 'src/app/components/game/game.component'
import { LoadingComponent } from 'src/app/components/loading/loading.component'
import { LobbyComponent } from 'src/app/components/lobby/lobby.component'
import { PlayerSlotComponent } from 'src/app/components/player-slot/player-slot.component'
import { RoomErrorComponent } from 'src/app/components/room-error/room-error.component'
import { SelectColorComponent } from 'src/app/components/select-color/select-color.component'
import { UnoCardModule } from 'src/app/components/uno-card/uno-card.module'
import { RoomRoutingModule } from './room-routing.module'
import { RoomComponent } from './room.component'
import { LoadingModule } from 'src/app/components/loading/loading.module'

@NgModule({
  declarations: [
    RoomComponent,
    RoomErrorComponent,
    LobbyComponent,
    GameComponent,
    PlayerSlotComponent,
    SelectColorComponent
  ],
  imports: [CommonModule, RoomRoutingModule, UnoCardModule, LoadingModule]
})
export class RoomModule {}
