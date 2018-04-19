/**
 * Created by gyt-John on 2017/3/24.
 */
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {LoginComponent} from './login/login.component'

@NgModule({
  imports: [
    // ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    AppRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [],
  providers: []
})

export class ClientAuthModule {
}

