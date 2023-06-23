import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { UnoCardComponent } from './components/uno-card/uno-card.component';
import { TestComponent } from './pages/test/test.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, RoomsComponent, UnoCardComponent, TestComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
