import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import {CustomizeMaterialModule} from '../module/customize-material.module';
import {RouteAnalyseComponent} from './route-analyse.component'

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
    RouteAnalyseComponent,
  ],
  entryComponents: [],
  exports: [],
  providers: [
  ]
})

export class ToolModule {
}
