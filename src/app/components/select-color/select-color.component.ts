import { Component, Input } from '@angular/core'
import { fadeAnimation } from 'src/app/helpers/animations'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css'],
  animations: [fadeAnimation()]
})
export class SelectColorComponent {
  size: number = 1.5

  readonly breakpoint$ = this.breakpointObserver.observe([
    Breakpoints.Large,
    Breakpoints.Medium,
    Breakpoints.Small,
    '(min-width: 500px)'
  ])

  @Input() select?: (color: number | false) => any

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpoint$.subscribe(() => this.breakpointChanged())
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.size = 1.5
    } else {
      this.size = 0.8
    }
  }

  s(i: number | false) {
    this.select?.(i)
  }
}
