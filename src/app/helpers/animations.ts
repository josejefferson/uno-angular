import { trigger, transition, style, animate } from '@angular/animations'

export const zoomAnimation = trigger('zoom', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0)', width: 0 }),
    animate(100, style({ width: '*' })),
    animate(200, style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)', width: '*' }),
    animate(200, style({ opacity: 0, transform: 'scale(0)' })),
    animate(100, style({ width: 0 }))
  ])
])

export const fadeAnimation = (timeIn = 200, timeOut?: number) =>
  trigger('fade', [
    transition(':enter', [style({ opacity: 0 }), animate(timeIn, style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate(timeOut ?? timeIn, style({ opacity: 0 }))])
  ])
