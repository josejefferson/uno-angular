import { Component } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { zoomAnimation } from 'src/app/helpers/animations'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [zoomAnimation]
})
export class TestComponent {
  cards: number[] = Array(10)
    .fill(0)
    .map((_, i) => i)

  constructor(private toastr: ToastrService) {}

  addCard() {
    this.cards.splice(2, 0, this.cards.length)
    this.toastr.success('Hello world!', 'Toastr fun!')
  }

  removeCard(i: number) {
    this.cards.splice(i, 1)
  }
}
