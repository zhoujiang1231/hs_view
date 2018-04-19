import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {DockNetListComponent} from './dock-net-list.component'
import {DockNetComponent} from './dock-net.component'
import {NewGroupNetDialogComponent} from './dialogs/new-group-net.dialog'
import {NewNetDialogComponent} from './dialogs/new-dock-net.dialog'
import {DockGroupService} from './dock-group.service'
import {DockNetService} from './dock-net.service'
import {NewNetFromGroupDialogComponent} from './dialogs/new-net-from-group.dialog'
import {DeployedNetComponent} from './deployed-net.component'

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
    DockNetListComponent,
    DockNetComponent,
    DeployedNetComponent,
    NewGroupNetDialogComponent,
    NewNetDialogComponent,
    NewNetFromGroupDialogComponent,
  ],
  entryComponents: [
    NewGroupNetDialogComponent,
    NewNetDialogComponent,
    NewNetFromGroupDialogComponent,
    DeployedNetComponent,
  ],
  exports: [],
  providers: [
    DockGroupService,
    DockNetService,
  ]
})

export class DockModule {
}
