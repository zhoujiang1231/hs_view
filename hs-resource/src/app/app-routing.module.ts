/**
 * Created by wangruixia on 2017/7/26.
 */
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {IndexComponent} from './core/index.component'
import {AuthGuard} from './core/services/auth-guard.service'
import {PageNotFoundComponent} from './core/page-not-found.component'
import {AuthorResolver} from './resolver/author.resolver'
import {RouterComponent} from './core/router.component'
import {SystemDirectDepartmentManageComponent} from './system/directDepartmentManage/system-directDepartmentManage.component'
import {DirectManagerComponent} from './system/directManagerManage/system-directManagerManage.component'
import {SystemCustomerManage} from './system/customerManage/system-customerManage.component'
import {CallRecordsRouterComponent} from './callRecord/callRecords/callRecords.component'
import {CallRecordsCdrObComponent} from './callRecord/callRecords/callRecordsCdrOb.component'
import {CdrIbComponent} from './cdrDetail/cdrIb/cdrIb.component'
import {CdrObComponent} from './cdrDetail/cdrOb/cdrOb.component'
import {HomeComponent} from './core/home/home.component'
import {LoginComponent} from './clientauth/login/login.component'
import {SystemEnterpriseAppManagerComponent} from "./system/enterpriseAppManager/system-enterpriseAppManager.component";
import {SystemEnterpriseFirmMessageComponent} from "./system/enterpriseFirmMessage/system-enterpriseFirmMessage.component";
import {SystemEnterpriseBasicMessageComponent} from "./system/enterpriseBasicMessage/system-enterpriseBasicMessage.component";
import {SystemVlinkAppComponent} from "./system/vlinkApp/system-vlinkApp.component"
import {SystemPaylogsComponent} from "./system/paylogs/system-paylogs.component";
import {SystemPreDeductLogComponent} from "./system/preDeductLog/system-preDeductLog.component";
import {SystemBillStatisticsComponent} from "./system/billStatistics/system-billStatistics.component";
import {SystemOperationLogComponent} from "./system/operationLog/system-operationLog.component";
import {SysteminSettingComponent} from "./system/appCostSetting/inSetting/system-inSetting.component";
import {SystemOtherSettingComponent} from "./system/appCostSetting/otherSetting/system-otherSetting.component";
import {SystemInMinCostSettingComponent} from "./system/numberCostSetting/inMinCostSetting/system-inMinCostSetting.component";
import {SystemNumberFunctionSettingComponent} from "./system/numberCostSetting/numberFunctionSetting/system-numberFunctionSetting.component";
import {SystemAppFunctionSettingComponent} from "./system/numberCostSetting/appFunctionSetting/system-appFunctionSetting.component"
import {SysteminBridgeSettingComponent} from "./system/appCostSetting/inBridgeSetting/system-inBridgeSetting.component";
import {SystemoutSettingComponent} from "./system/appCostSetting/outSetting/system-outSetting.component";
import {SystemoutBridgeSettingComponent} from "./system/appCostSetting/outBridgeSetting/system-outBridgeSetting.component";
import {SystemDeductTableComponent} from "./system/deductTable/system-deductTable.component";
import {SystemAppDeductDetailLogComponent} from "./system/appDeductDetailLog/system-appDeductDetailLog.component";
import {SystemNumberInCostLogComponent} from "./system/numberInCostLog/system-numberInCostLog.component";
import {SystemNumberFunctionCostLogComponent} from "./system/numberFunctionCostLog/system-numberFunctionCostLog.component";
import {SystemPreAppDeductLogComponent} from "./system/preAppDeductLog/system-preAppDeductLog.component";
import {SystemPreAppDeductDetailLogComponent} from "./system/preAppDeductDetailLog/system-preAppDeductDetailLog.component";
import {SystemPreNumberFunctionCostLogComponent} from "./system/preNumberFunctionCostLog/system-preNumberFunctionCostLog.component";
import {SystemPreNumberInCostLogComponent} from "./system/preNumberInCostLog/system-preNumberInCostLog.component";
import {SystemMessageSettingComponent} from "./system/appCostSetting/otherSetting/messageSetting/system-messageSetting.component";
import {SystemUssdSettingComponent} from "./system/appCostSetting/otherSetting/ussdSetting/system-ussdSetting.component";
import {SystemVncSettingComponent} from "./system/appCostSetting/otherSetting/vncSetting/system-vncSetting.component";

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {
    path: 'index', component: IndexComponent,
    canActivate: [AuthGuard],
    resolve: {author: AuthorResolver},
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'callRecords', component: RouterComponent,
          children: [
              {path: '', redirectTo: 'cdrIb', pathMatch: 'full'},
              {path: 'cdrIb', component: CallRecordsRouterComponent},
              {path: 'cdrOb', component: CallRecordsCdrObComponent}
          ]
      },
      {path: '', component: RouterComponent,
       children: [
         {path: '', redirectTo: 'directDepartmentManage', pathMatch: 'full'},
         {path: 'directDepartmentManage', component: SystemDirectDepartmentManageComponent},
         {path: 'directManagerManage', component: DirectManagerComponent},
         {path: 'customerManage', component: SystemCustomerManage},
         {path: 'vlinkApp', component: SystemVlinkAppComponent},
         {path: 'paylogs', component: SystemPaylogsComponent},
         {path: 'preDeductLog', component: SystemPreDeductLogComponent},
         {path: 'billStatistics', component: SystemBillStatisticsComponent},
         {path: 'operationLog', component: SystemOperationLogComponent},
         {path: 'customerManage/enterpriseBasicMessage', component: SystemEnterpriseBasicMessageComponent},
         {path: 'customerManage/enterpriseFirmMessage', component: SystemEnterpriseFirmMessageComponent},
         {path: 'customerManage/enterpriseAppManager', component: SystemEnterpriseAppManagerComponent},
         {path: 'appCostSetting/inSetting', component: SysteminSettingComponent},
         {path: 'appCostSetting/inBridgeSetting', component: SysteminBridgeSettingComponent},
         {path: 'appCostSetting/outSetting', component: SystemoutSettingComponent},
         {path: 'appCostSetting/outBridgeSetting', component: SystemoutBridgeSettingComponent},
         {path: 'appCostSetting/messageSetting', component: SystemMessageSettingComponent},
         {path: 'appCostSetting/ussdSetting', component: SystemUssdSettingComponent},
         {path: 'appCostSetting/vncSetting', component: SystemVncSettingComponent},
         {path: 'appCostSetting/otherSetting', component: SystemOtherSettingComponent},
         {path: 'numberCostSetting/inMinCostSetting', component: SystemInMinCostSettingComponent},
         {path: 'numberCostSetting/numberFunctionSetting', component: SystemNumberFunctionSettingComponent},
         {path: 'numberCostSetting/appFunctionSetting', component: SystemAppFunctionSettingComponent},
         {path: 'paylogs/deductTable', component: SystemDeductTableComponent},
         {path: 'paylogs/appDeductDetailLoge', component: SystemAppDeductDetailLogComponent},
         {path: 'paylogs/numberInCostLog', component: SystemNumberInCostLogComponent},
         {path: 'paylogs/numberFunctionCostLog', component: SystemNumberFunctionCostLogComponent},
         {path: 'preDeductLog/preAppDeductLog', component: SystemPreAppDeductLogComponent},
         {path: 'preDeductLog/preAppDeductDetailLog', component: SystemPreAppDeductDetailLogComponent},
         {path: 'preDeductLog/preNumberInCostLog', component: SystemPreNumberInCostLogComponent},
         {path: 'preDeductLog/preNumberFunctionCostLog', component: SystemPreNumberFunctionCostLogComponent},
       ]
      },
      {path: 'cdrDetail', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'cdrIb', pathMatch: 'full'},
          {path: 'cdrIb', component: CdrIbComponent},
          {path: 'cdrOb', component: CdrObComponent}
        ]
      },
    ]
  },
  {
    path: 'signin', component: LoginComponent
  },
  {path: '**', component: PageNotFoundComponent},
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthorResolver
  ]
})

export class AppRoutingModule {
}
