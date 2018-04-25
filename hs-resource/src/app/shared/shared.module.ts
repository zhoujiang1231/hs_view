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
import {Ng2FlatpickrComponent} from 'ng2-flatpickr/ng2-flatpickr'
import {EmptyPermissionComponent} from './empty-data.component'
import {LoadingComponent} from './loading.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomizeMaterialModule,
    ReactiveFormsModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    NgxDatatableModule,
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
    Ng2FlatpickrComponent,
    EmptyPermissionComponent,
    LoadingComponent,
  ],
  exports: [
    SecondMenuComponent,
    PageHeaderComponent,
    DateFormatPipe,
    MinuteFormatPipe,
    SecondFormatPipe,
    MicrosecondFormatPipe,
    PaginationComponent,
    CustomizeMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDatatableModule,
    Ng2FlatpickrComponent,
    EmptyPermissionComponent,
    LoadingComponent,
  ],
})

export class SharedModule {
}
