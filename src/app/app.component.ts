import { Component } from '@angular/core'
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { fadeAnimation } from './helpers/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation()]
})
export class AppComponent {
  loading = false
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false
      }
    })
  }
}
