import { animate, keyframes, state, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('zoom', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)', width: 0 }),
        animate(100, style({ width: '*' })),
        animate(200, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)', width: '*' }),
        animate(200, style({ opacity: 0, transform: 'scale(10)' })),
        animate(100, style({ width: 0 }))
      ])
    ])
  ]
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
