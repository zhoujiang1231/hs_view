import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module';
import {NumbersComponent} from './numbers.component'
import {NumbersService} from './numbers.service'
import {RedisDialogComponent} from './dialog/redis.dialog'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    AppRoutingModule
  ],
  declarations: [
    NumbersComponent,
    RedisDialogComponent,
  ],
  entryComponents: [
    RedisDialogComponent,
  ],
  exports: [],
  providers: [
    NumbersService
  ]
})

export class PhoneNumberModule {
}
