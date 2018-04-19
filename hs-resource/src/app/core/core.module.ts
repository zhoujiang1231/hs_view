import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {CustomizeMaterialModule} from '../module/customize-material.module'

import {AppRoutingModule} from '../app-routing.module'
import {ConstantService} from './services/constant.service'
import {ConnectionService} from './services/connection.service'
import {SwalService} from './services/swal.service'
import {LocalStorage} from './services/localstorage.service'
import {DataService} from './services/data.service'
import {HeaderComponent} from './header/header.component'
import {SideComponent} from './sidebar/sidebar.component'
import {AuthGuard} from './services/auth-guard.service'
import {RouterComponent} from './router.component'
import {PageNotFoundComponent} from './page-not-found.component'
import {AppHomeComponent} from './app-home.component'
import {UploaderService} from './services/uploader.service'
import {SharedModule} from '../shared/shared.module'
import {HomeComponent} from './home/home.component'
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar'
import {ScrollBarProvider} from '../providers'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomizeMaterialModule,
    SharedModule,
    PerfectScrollbarModule,
    AppRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    SideComponent,
    RouterComponent,
    HomeComponent,
    PageNotFoundComponent,
    AppHomeComponent,
  ],
  exports: [
    HeaderComponent,
    SideComponent,
    RouterComponent,
    HomeComponent,
    AppHomeComponent
  ],
  providers: [
    ConstantService,
    ConnectionService,
    SwalService,
    LocalStorage,
    DataService,
    UploaderService,
    AuthGuard,
    ScrollBarProvider
  ],
})

export class CoreModule {
}
