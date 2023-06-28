import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    title: 'UNO',
    loadChildren: () => import('./pages/index/index.module').then((m) => m.IndexModule)
  },
  {
    path: 'test',
    title: 'Test Page | UNO',
    loadChildren: () => import('./pages/test/test.module').then((m) => m.TestModule)
  },
  {
    path: 'setup',
    title: 'Seus dados | UNO',
    loadChildren: () => import('./pages/setup/setup.module').then((m) => m.SetupModule)
  },
  {
    path: 'rooms',
    title: 'Salas | UNO',
    loadChildren: () => import('./pages/rooms/rooms.module').then((m) => m.RoomsModule)
  },
  {
    path: 'room',
    title: 'UNO',
    loadChildren: () => import('./pages/room/room.module').then((m) => m.RoomModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    title: '404 Not Found | UNO',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
