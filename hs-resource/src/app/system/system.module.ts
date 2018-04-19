import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {SystemDemoComponent} from './demo/system-demo.component'
import {SystemModuleComponent} from './module/system-module.component'
import {SystemProductComponent} from './product/system-product.component'
import {SystemPlatformComponent} from './platform/system-platform.component'
import {SystemParameterComponent} from './parameter/system-parameter.component'
import {SystemUserComponent} from './user/system-user.component'
import {SystemRoleComponent} from './role/system-role.component'
import {SystemAclComponent} from './acl/system-acl.component'
import {SystemAlertInfoComponent} from './alert-info/system-alert-info.component'
import {SystemRealTimeComponent} from './real-time/system-real-time.component'
import {RealTimeListsComponent} from './real-time/real-time-lists.component'
import {RealTimeListComponent} from './real-time/real-time-list.component'
import {SysAlertDialogComponent} from './alert-info/sys-alert-info.dialog'
import {SysNewGroupDialogComponent} from './real-time/new-sys-groups.dialog'
import {SysNewStatisticDialogComponent} from './real-time/new-statistics.dialog'
import {SysNewDemoDialogComponent} from './demo/new-demo.dialog'
import {SysNewProductDialogComponent} from './product/new-product.dialog'
import {SysNewUserDialogComponent} from './user/new-user.dialog'
import {SysNewRoleDialogComponent} from './role/new-role.dialog'
import {SysNewAclDialogComponent} from './acl/new-acl.dialog'
import {SysNewPlatDialogComponent} from './platform/new-platform.dialog'
import {SysDemoService} from './demo/sys-demo.service'
import {SysProductService} from './product/sys-product.service'
import {SysPlatformService} from './platform/sys-platform.service'
import {SysParameterService} from './parameter/sys-param.service'
import {SysParamDialogComponent} from './parameter/sys-param.dialog'
import {SysUserService} from './user/sys-user.service'
import {RevisePasswordDialogComponent} from './user/revise-password.dialog'
import {SysRoleService} from './role/sys-role.service'
import {SysModuleService} from './module/sys-module.service'
import {SysAclService} from './acl/sys-acl.service'
import {SysTimeGroupService} from './real-time/sys-realtime-groups.service'
import {SysTimeListService} from './real-time/sys-realtime-list.service'
import {SysAlertService} from './alert-info/sys-alert.service'
// import {RouteSysProductComponent} from './product/route-sys-product.component'
import {SysProductSettingComponent} from './product/sys-product-setting.component'
import {SysProductSettingDialogComponent} from './product/edit-product-setting.dialog'
import {SysDivideModuleDialogComponent} from './role/divide-module.dialog'
import {RealTimeSearchComponent} from './real-time/real-time-search.component'
import {SysTimeSearchService} from './real-time/sys-realtime-search.service'

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
    SystemDemoComponent,
    SystemProductComponent,
    SystemPlatformComponent,
    SystemParameterComponent,
    SystemUserComponent,
    SystemRoleComponent,
    SystemModuleComponent,
    SystemAclComponent,
    SystemRealTimeComponent,
    SystemAlertInfoComponent,
    RealTimeListsComponent,
    RealTimeListComponent,
    SysAlertDialogComponent,
    SysNewGroupDialogComponent,
    SysNewStatisticDialogComponent,
    SysNewDemoDialogComponent,
    SysNewProductDialogComponent,
    SysNewUserDialogComponent,
    SysNewRoleDialogComponent,
    SysNewAclDialogComponent,
    SysNewPlatDialogComponent,
    // SysSettingDialogComponent,
    SysParamDialogComponent,
    RevisePasswordDialogComponent,
    // RouteSysProductComponent,
    SysProductSettingComponent,
    SysProductSettingDialogComponent,
    SysDivideModuleDialogComponent,
    RealTimeSearchComponent,
  ],
  entryComponents: [
    SysAlertDialogComponent,
    SysNewGroupDialogComponent,
    SysNewStatisticDialogComponent,
    SysNewDemoDialogComponent,
    SysNewProductDialogComponent,
    SysNewUserDialogComponent,
    SysNewRoleDialogComponent,
    SysNewAclDialogComponent,
    SysNewPlatDialogComponent,
    // SysSettingDialogComponent,
    SysParamDialogComponent,
    SysProductSettingComponent,
    RevisePasswordDialogComponent,
    SysProductSettingDialogComponent,
    SysDivideModuleDialogComponent,
  ],
  exports: [],
  providers: [
    SysDemoService,
    SysProductService,
    SysPlatformService,
    SysParameterService,
    SysUserService,
    SysRoleService,
    SysModuleService,
    SysAclService,
    SysTimeGroupService,
    SysTimeListService,
    SysAlertService,
    SysTimeSearchService,
  ]
})

export class SystemModule {
}
