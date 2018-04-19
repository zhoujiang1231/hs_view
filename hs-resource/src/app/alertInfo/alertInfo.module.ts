/**
 * Created by kosei on 2017/10/24.
 */
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {AlertInfoComponent} from './alertInfo.component'
import {AlertNewInfoDialogComponent} from './alert-new-alertInfo.dialog'
import {AlertInfoOperateService} from './alertInfo.service'

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
    AlertInfoComponent,
    AlertNewInfoDialogComponent,
  ],
  entryComponents: [
    AlertNewInfoDialogComponent,
  ],
  exports: [
  ],
  providers: [
    AlertInfoOperateService,
  ]
})

export class AlertInfoModule {

}
