import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io'
import { ToastrModule } from 'ngx-toastr'
import { env } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoadingModule } from './components/loading/loading.module'

const socketConfig: SocketIoConfig = {
  url: env.api + '/',
  options: {
    transports: ['websocket'],
    withCredentials: true
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(socketConfig),
    ToastrModule.forRoot(),
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
