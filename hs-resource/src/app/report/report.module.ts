import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {BusStatementComponent} from './business/bus-statement.component'
import {BusDayStatementComponent} from './business/day-statement.component'
import {BusMonthStatementComponent} from './business/month-statement.component'
import {ComStatementComponent} from './company/com-statement.component'
import {ComDayStatementComponent} from './company/en-day-statement.component'
import {ComMonthStatementComponent} from './company/en-month-statement.component'
import {RepBusinessService} from './business/business.service'
import {RepCompanyService} from './company/company.service'

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
    BusStatementComponent,
    BusDayStatementComponent,
    BusMonthStatementComponent,
    ComStatementComponent,
    ComDayStatementComponent,
    ComMonthStatementComponent
  ],
  entryComponents: [],
  exports: [],
  providers: [
    RepBusinessService,
    RepCompanyService,
  ]
})

export class ReportModule {
}
