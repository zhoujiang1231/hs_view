import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgModule} from '@angular/core'
import {CustomizeMaterialModule} from './module/customize-material.module'
import {MobxAngularModule} from 'mobx-angular'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {CoreModule} from './core/core.module'
import { PaginationModule } from 'ngx-bootstrap'
import {IndexComponent} from './core/index.component'
// import 'hammerjs'
import 'rxjs'
import {AlertInfoModule} from './alertInfo/alertInfo.module'
import {BusinessModule} from './business/business.module'
import {SystemModule} from './system/system.module'
import {ToolModule} from './tool/tool.module'
import {DockModule} from './dock/dock.module'
import {ReportModule} from './report/report.module';
import {DailyModule} from './daily/daily.module'
import {PhoneModule} from './phone/phone.module'
import {ClientAuthModule} from './clientauth/clientauth.module'
import {PhoneNumberModule} from './numbers/numbers.module'
import {CallModule} from './call/call.modue'
// import '@angular/material/@angular/material.js'


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomizeMaterialModule,
    MobxAngularModule,
    PaginationModule.forRoot(),
    CoreModule,
    DailyModule,
    AlertInfoModule,
    BusinessModule,
    SystemModule,
    DockModule,
    ToolModule,
    PhoneModule,
    ReportModule,
    PhoneNumberModule,
    CallModule,
    ClientAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
