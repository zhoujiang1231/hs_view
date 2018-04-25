import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {CallRecordsRouterComponent} from './callRecords/callRecords.component'
import {CallRecordsCdrObComponent} from './callRecords/callRecordsCdrOb.component'
import {CallRecordsService} from './callRecord.service'
import {ExportCallRecordsComponent} from './callRecords/export-callRecords.component'
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
    CallRecordsRouterComponent,
    CallRecordsCdrObComponent,
    ExportCallRecordsComponent,
  ],
  entryComponents: [
    ExportCallRecordsComponent,
  ],
  exports: [],
  providers: [
    CallRecordsService,
  ]
})

export class CallRecordModule {
}
