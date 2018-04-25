import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import { TypeaheadModule } from 'ngx-bootstrap';
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {SystemDirectDepartmentManageComponent} from './directDepartmentManage/system-directDepartmentManage.component'
import {DirectManagerComponent} from './directManagerManage/system-directManagerManage.component'
import {SystemCustomerManage} from './customerManage/system-customerManage.component'
import {NewDirectDepartmentManageDialogComponent} from './directDepartmentManage/new-directDepartmentManage.dialog'
import {NewManagerDialogComponent} from './directManagerManage/new-directManagerManage.dialog'
import {SysDitectDepartmentManageService} from './directDepartmentManage/sys-directDepartmentManage.service'
import {SysManagerManageService} from './directManagerManage/sys-directManagerManage.service'
import {SysCustomerManageService} from './customerManage/sys-customerManage.service'
import {SysCustomerManageDialogComponent} from './customerManage/sys-customerManage.dialog'
import {SysUserService} from "./user/sys-user.service";
import {SysEnterpriseBasicMessageService} from "./enterpriseBasicMessage/sys-enterpriseBasicMessage.service";
import {SysEnterpriseFirmMessageService} from "./enterpriseFirmMessage/sys-enterpriseFirmMessage.service";
import {SysEnterpriseAppManagerService} from "./enterpriseAppManager/sys-enterpriseAppManager.service";
import {SystemEnterpriseBasicMessageComponent} from "./enterpriseBasicMessage/system-enterpriseBasicMessage.component";
import {SystemEnterpriseFirmMessageComponent} from "./enterpriseFirmMessage/system-enterpriseFirmMessage.component";
import {SystemEnterpriseAppManagerComponent} from "./enterpriseAppManager/system-enterpriseAppManager.component";
import {NewEnterpriseFirmMessageDialogComponent} from "./enterpriseFirmMessage/new-enterpriseFirmMessage.dialog";
import {SystemVlinkAppComponent} from "./vlinkApp/system-vlinkApp.component";
import {SysVlinkAppService} from "./vlinkApp/sys-vlinkApp.service";
import {NewVlinkAppDialogComponent} from "./enterpriseAppManager/new-VlinkApp.dialog";
import {SysFileListDialogComponent} from "./enterpriseAppManager/sys-fileList.dialog";
import {SystemPaylogsComponent} from "./paylogs/system-paylogs.component";
import {SysPaylogsService} from "./paylogs/sys-paylogs.service";
import {SystemPreDeductLogComponent} from "./preDeductLog/system-preDeductLog.component";
import {SysPreDeductLogService} from "./preDeductLog/sys-preDeductLog.service";
import {SystemBillStatisticsComponent} from "./billStatistics/system-billStatistics.component";
import {SysBillStatisticsService} from "./billStatistics/sys-billStatistics.service";
import {SystemOperationLogComponent} from "./operationLog/system-operationLog.component";
import {SysOperationLogService} from "./operationLog/sys-operationLog.service";
import {SysinSettingService} from "./appCostSetting/inSetting/sys-inSetting.service";
import {SysteminSettingComponent} from "./appCostSetting/inSetting/system-inSetting.component";
import {SysinBridgeSettingService} from "./appCostSetting/inBridgeSetting/sys-inBridgeSetting.service";
import {SysteminBridgeSettingComponent} from "./appCostSetting/inBridgeSetting/system-inBridgeSetting.component";
import {SysoutSettingService} from "./appCostSetting/outSetting/sys-outSetting.service";
import {SystemoutSettingComponent} from "./appCostSetting/outSetting/system-outSetting.component";
import {SysoutBridgeSettingService} from "./appCostSetting/outBridgeSetting/sys-outBridgeSetting.service";
import {SystemoutBridgeSettingComponent} from "./appCostSetting/outBridgeSetting/system-outBridgeSetting.component";
import {SysOtherSettingService} from "./appCostSetting/otherSetting/sys-otherSetting.service";
import {SystemOtherSettingComponent} from "./appCostSetting/otherSetting/system-otherSetting.component";
import {SysInMinCostSettingService} from "./numberCostSetting/inMinCostSetting/sys-inMinCostSetting.service";
import {SystemInMinCostSettingComponent} from "./numberCostSetting/inMinCostSetting/system-inMinCostSetting.component";
import {SystemNumberFunctionSettingComponent} from "./numberCostSetting/numberFunctionSetting/system-numberFunctionSetting.component";
import {SysNumberFunctionSettingService} from "./numberCostSetting/numberFunctionSetting/sys-numberFunctionSetting.service"
import {SystemAppFunctionSettingComponent} from "./numberCostSetting/appFunctionSetting/system-appFunctionSetting.component"
import {SysAppFunctionSettingService} from "./numberCostSetting/appFunctionSetting/sys-appFunctionSetting.service";
import {CreateCostLogDialogComponent} from "./user/createCostLog.dialog";
import {SysDeductTableService} from "./deductTable/sys-deductTable.service";
import {SystemDeductTableComponent} from "./deductTable/system-deductTable.component";
import {SystemAppDeductDetailLogComponent} from "./appDeductDetailLog/system-appDeductDetailLog.component";
import {SysAppDeductDetailLogService} from "./appDeductDetailLog/sys-appDeductDetailLog.service";
import {SystemNumberFunctionCostLogComponent} from "./numberFunctionCostLog/system-numberFunctionCostLog.component";
import {SystemNumberInCostLogComponent} from "./numberInCostLog/system-numberInCostLog.component";
import {SysNumberFunctionCostLogService} from "./numberFunctionCostLog/sys-numberFunctionCostLog.service";
import {SysNumberInCostLogService} from "./numberInCostLog/sys-numberInCostLog.service";
import {SysPreAppDeductLogService} from "./preAppDeductLog/sys-preAppDeductLog.service";
import {SystemPreAppDeductLogComponent} from "./preAppDeductLog/system-preAppDeductLog.component";
import {SysPreAppDeductDetailLogService} from "./preAppDeductDetailLog/sys-preAppDeductDetailLog.service";
import {SystemPreAppDeductDetailLogComponent} from "./preAppDeductDetailLog/system-preAppDeductDetailLog.component";
import {SysPreNumberInCostLogService} from "./preNumberInCostLog/sys-preNumberInCostLog.service";
import {SystemPreNumberInCostLogComponent} from "./preNumberInCostLog/system-preNumberInCostLog.component";
import {SysPreNumberFunctionCostLogService} from "./preNumberFunctionCostLog/sys-preNumberFunctionCostLog.service";
import {SystemPreNumberFunctionCostLogComponent} from "./preNumberFunctionCostLog/system-preNumberFunctionCostLog.component";
import {SystemMessageSettingComponent} from "./appCostSetting/otherSetting/messageSetting/system-messageSetting.component";
import {SystemUssdSettingComponent} from "./appCostSetting/otherSetting/ussdSetting/system-ussdSetting.component";
import {SystemVncSettingComponent} from "./appCostSetting/otherSetting/vncSetting/system-vncSetting.component";
import {EditInMinCostSettingDialogComponent} from "./numberCostSetting/inMinCostSetting/edit-inMinCostSetting.dialog";
import {SysBasicFileListDialogComponent} from "./enterpriseBasicMessage/sys-basicFileList.dialog";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    AppRoutingModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    SystemDirectDepartmentManageComponent,
    DirectManagerComponent,
    SystemCustomerManage,
    NewDirectDepartmentManageDialogComponent,
    NewManagerDialogComponent,
    SysCustomerManageDialogComponent,
    SystemEnterpriseBasicMessageComponent,
    SystemEnterpriseFirmMessageComponent,
    SystemEnterpriseAppManagerComponent,
    NewEnterpriseFirmMessageDialogComponent,
    NewVlinkAppDialogComponent,
    NewVlinkAppDialogComponent,
    SysFileListDialogComponent,
    SystemVlinkAppComponent,
    SystemPaylogsComponent,
    SystemPreDeductLogComponent,
    SystemBillStatisticsComponent,
    SystemOperationLogComponent,
    SysteminSettingComponent,
    SysteminBridgeSettingComponent,
    SystemoutSettingComponent,
    SystemoutBridgeSettingComponent,
    SystemOtherSettingComponent,
    SystemInMinCostSettingComponent,
    SystemNumberFunctionSettingComponent,
    SystemAppFunctionSettingComponent,
    CreateCostLogDialogComponent,
    SystemDeductTableComponent,
    SystemAppDeductDetailLogComponent,
    SystemNumberFunctionCostLogComponent,
    SystemNumberInCostLogComponent,
    SystemPreAppDeductLogComponent,
    SystemPreAppDeductDetailLogComponent,
    SystemPreNumberInCostLogComponent,
    SystemPreNumberFunctionCostLogComponent,
    SystemMessageSettingComponent,
    SystemUssdSettingComponent,
    SystemVncSettingComponent,
    EditInMinCostSettingDialogComponent,
    SysBasicFileListDialogComponent,
  ],
  entryComponents: [
    NewDirectDepartmentManageDialogComponent,
    NewManagerDialogComponent,
    SysCustomerManageDialogComponent,
    NewEnterpriseFirmMessageDialogComponent,
    NewVlinkAppDialogComponent,
    NewVlinkAppDialogComponent,
    SysFileListDialogComponent,
    CreateCostLogDialogComponent,
    EditInMinCostSettingDialogComponent,
    SysBasicFileListDialogComponent,
  ],
  exports: [],
  providers: [
    SysDitectDepartmentManageService,
    SysManagerManageService,
    SysCustomerManageService,
    SysUserService,
    SysEnterpriseBasicMessageService,
    SysEnterpriseFirmMessageService,
    SysEnterpriseAppManagerService,
    SysVlinkAppService,
    SysPaylogsService,
    SysPreDeductLogService,
    SysBillStatisticsService,
    SysOperationLogService,
    SysinSettingService,
    SysinBridgeSettingService,
    SysoutSettingService,
    SysoutBridgeSettingService,
    SysOtherSettingService,
    SysInMinCostSettingService,
    SysNumberFunctionSettingService,
    SysAppFunctionSettingService,
    SysDeductTableService,
    SysAppDeductDetailLogService,
    SysNumberFunctionCostLogService,
    SysNumberInCostLogService,
    SysPreAppDeductLogService,
    SysPreAppDeductDetailLogService,
    SysPreNumberInCostLogService,
    SysPreNumberFunctionCostLogService,
  ]
})

export class SystemModule {
}
