import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ToastService<T=any> {
  private messageSubject = new Subject<T|null>()
  public message$ = this.messageSubject.asObservable()

  showToast(message: T): void {
    this.messageSubject.next(message)
  }

  hideToast() {
    this.messageSubject.next(null)
  }
}
