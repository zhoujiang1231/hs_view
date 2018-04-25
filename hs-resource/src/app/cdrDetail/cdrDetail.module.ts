import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {CdrIbComponent} from './cdrIb/cdrIb.component'
import {CdrObComponent} from './cdrOb/cdrOb.component'
import {CdrDetailService} from './cdrDetail.service'
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    AppRoutingModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
      CdrIbComponent,
    CdrObComponent,
  ],
  entryComponents: [],
  exports: [],
  providers: [
      CdrDetailService,
  ]
})

export class CdrDetailModule {
}
