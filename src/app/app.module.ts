import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io'
import { ToastrModule } from 'ngx-toastr'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoadingModule } from './components/loading/loading.module'
import { UNOEventComponent } from './components/uno-event/uno-event.component'

const socketConfig: SocketIoConfig = {
  url: environment.api + '/',
  options: {
    transports: ['websocket'],
    withCredentials: true
  }
}

@NgModule({
  declarations: [AppComponent, UNOEventComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(socketConfig),
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      includeTitleDuplicates: true
    }),
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
