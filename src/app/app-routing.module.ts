import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { RoomsComponent } from './pages/rooms/rooms.component'
import { TestComponent } from './pages/test/test.component'
import { RoomComponent } from './pages/room/room.component'
import { SetupComponent } from './pages/setup/setup.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room', component: RoomComponent },
  { path: 'test', component: TestComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
