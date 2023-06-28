import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/index/index.module').then((m) => m.IndexModule) },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then((m) => m.TestModule)
  },
  {
    path: 'setup',
    loadChildren: () => import('./pages/setup/setup.module').then((m) => m.SetupModule)
  },
  {
    path: 'rooms',
    loadChildren: () => import('./pages/rooms/rooms.module').then((m) => m.RoomsModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./pages/room/room.module').then((m) => m.RoomModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
