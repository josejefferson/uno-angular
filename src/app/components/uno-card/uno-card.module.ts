import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UnoCardComponent } from './uno-card.component'

@NgModule({
  declarations: [UnoCardComponent],
  imports: [CommonModule],
  exports: [UnoCardComponent]
})
export class UnoCardModule {}
