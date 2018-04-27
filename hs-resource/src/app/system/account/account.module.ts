import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../../shared/shared.module'
import {AppRoutingModule} from '../../app-routing.module'
import {CustomizeMaterialModule} from '../../module/customize-material.module'
import {SystemAccountInfoComponent} from './../account/info/system-accountInfo.component'
import {SystemAccountPswComponent} from './../account/psw/system-accountPsw.component'
import {SysAccountService} from './sys-account.service'
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
      SystemAccountInfoComponent,
      SystemAccountPswComponent,
  ],
  entryComponents: [
  ],
  exports: [],
  providers: [
      SysAccountService,
  ]
})

export class AccountModule {
}
