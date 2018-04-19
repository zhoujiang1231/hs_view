/**
 * 存放可被复用的模块
 */
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {SecondMenuComponent} from './second-menu/second-menu.component'
import {AppRoutingModule} from '../app-routing.module'
import {DateFormatPipe, MicrosecondFormatPipe, MinuteFormatPipe, SecondFormatPipe} from './pipe/date.pipe'
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {FileUploadModule} from 'ng2-file-upload'
import { PaginationModule } from 'ngx-bootstrap'
import {PageHeaderComponent} from './page-header'
import {NgxDatatableModule} from '@swimlane/ngx-datatable'
import {PaginationComponent} from './pagination/pagination.component'
import {EmptyPermissionComponent} from './empty-data.component'
import {LoadingComponent} from './loading.component'
import { Ng2FlatpickrModule } from 'ng2-flatpickr'
import {MiniFormComponent} from './mini-form'
import {PageComponent} from './pagination/page.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomizeMaterialModule,
    ReactiveFormsModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    NgxDatatableModule,
    Ng2FlatpickrModule,
    AppRoutingModule
  ],
  declarations: [
    SecondMenuComponent,
    PageHeaderComponent,
    DateFormatPipe,
    MinuteFormatPipe,
    SecondFormatPipe,
    MicrosecondFormatPipe,
    PaginationComponent,
    PageComponent,
    EmptyPermissionComponent,
    LoadingComponent,
    MiniFormComponent,
  ],
  exports: [
    SecondMenuComponent,
    PageHeaderComponent,
    DateFormatPipe,
    MinuteFormatPipe,
    SecondFormatPipe,
    MicrosecondFormatPipe,
    PaginationComponent,
    PageComponent,
    CustomizeMaterialModule,
    Ng2FlatpickrModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDatatableModule,
    EmptyPermissionComponent,
    LoadingComponent,
    MiniFormComponent,
  ],
})

export class SharedModule {
}
