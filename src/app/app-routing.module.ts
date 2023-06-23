import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { RoomsComponent } from './pages/rooms/rooms.component'
import { TestComponent } from './pages/test/test.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: RoomsComponent },
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
