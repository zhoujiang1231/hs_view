import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTabsModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
} from '@angular/material'
import {MAT_DATE_FORMATS} from '@angular/material/typings/core/datetime/date-formats'

@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ],
  declarations: [],
})
export class CustomizeMaterialModule {
}
