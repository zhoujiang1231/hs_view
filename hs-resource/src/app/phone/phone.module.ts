import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module';
import {PhoneNoteComponent} from './phone-note.component'
import {PhoneNoteService} from './phone.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    AppRoutingModule,
  ],
  declarations: [
    PhoneNoteComponent,
  ],
  entryComponents: [],
  exports: [],
  providers: [
    PhoneNoteService,
  ]
})

export class PhoneModule {
}
