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
import 'hammerjs'
import 'rxjs'
import {SystemModule} from './system/system.module'
import {ClientAuthModule} from './clientauth/clientauth.module'
import {AccountModule} from "./system/account/account.module";
import {HashLocationStrategy, LocationStrategy} from '@angular/common'

// import '@angular/material/@angular/material.js'


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomizeMaterialModule,
    MobxAngularModule,
    PaginationModule.forRoot(),
    CoreModule,
    SystemModule,
    AppRoutingModule,
    ClientAuthModule,
    AccountModule,
  ],
  providers: [
      {
          provide: LocationStrategy,
          useClass: HashLocationStrategy
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
