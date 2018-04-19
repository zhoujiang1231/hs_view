import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {BusinessListComponent} from './business-list.component'
import {BusinessRouterComponent} from './business-router.component'
import {NewBusinessListDialogComponent} from './dialog/new-business-list.dialog'
import {NewBusinessRouterDialogComponent} from './dialog/new-business-router.dialog'
import {BusinessListService} from './business-list.service'
import {BusinessRouterService} from './business-router.service'
import {BusinessActionDialogComponent} from './dialog/action.dialog'
import {DndModule} from 'ng2-dnd'
import {AddActionDialogComponent} from './dialog/add-action.dialog'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    DndModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    BusinessListComponent,
    BusinessRouterComponent,
    NewBusinessListDialogComponent,
    NewBusinessRouterDialogComponent,
    BusinessActionDialogComponent,
    AddActionDialogComponent,
  ],
  entryComponents: [
    NewBusinessListDialogComponent,
    NewBusinessRouterDialogComponent,
    BusinessActionDialogComponent,
    AddActionDialogComponent,
  ],
  exports: [],
  providers: [
    BusinessListService,
    BusinessRouterService,
  ]
})

export class BusinessModule {
}
