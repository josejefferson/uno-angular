import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NotFoundRoutingModule } from './not-found-routing.module'
import { NotFoundComponent } from './not-found.component'
import { UnoCardModule } from 'src/app/components/uno-card/uno-card.module'

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, UnoCardModule]
})
export class NotFoundModule {}
