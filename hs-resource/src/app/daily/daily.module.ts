import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {DailyOperateComponent} from './daily-operate/daily-operate.component'
import {DailyRouterComponent} from './daily-router/daily-router.component'
import {DailyService} from './daily.service'

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
    DailyOperateComponent,
    DailyRouterComponent
  ],
  entryComponents: [],
  exports: [],
  providers: [
    DailyService,
  ]
})

export class DailyModule {
}
