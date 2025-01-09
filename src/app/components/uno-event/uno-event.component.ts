import { Component, OnInit } from '@angular/core'
import { fadeAnimation } from 'src/app/helpers/animations'
import { ToastService } from 'src/app/services/toast.service'

@Component({
  selector: 'app-uno-event',
  templateUrl: './uno-event.component.html',
  styleUrls: ['./uno-event.component.css'],
  animations: [fadeAnimation()]
})
export class UNOEventComponent implements OnInit {
  message: string | null = null
  timer?: NodeJS.Timeout

  constructor(private toastService: ToastService<string>) {}

  ngOnInit() {
    this.toastService.message$.subscribe((message) => {
      clearTimeout(this.timer)
      this.message = message
      if (message === null) return
      this.timer = setTimeout(() => {
        this.toastService.hideToast()
      }, 3000)
    })
  }
}
