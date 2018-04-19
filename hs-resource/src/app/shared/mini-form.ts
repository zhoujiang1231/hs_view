import {Component, EventEmitter, Inject, Input, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-mini-form',
  template: `
    <form [formGroup]="targetForm" (ngSubmit)="saveData(data)">
      <div class="row easyUsed">
        <div class="col-5">
          <mat-form-field class="w-100">
            <input type="text" matInput
                   name="key" [formControl]="targetForm.controls['key']"
                   [(ngModel)]="data.key"
                   placeholder="key" required>
            <mat-error
              *ngIf="targetForm.controls['key'].touched && targetForm.controls['key'].hasError('required')">
              字段不能为空！
            </mat-error>
          </mat-form-field>
        </div>
        <div class="col-5">
          <mat-form-field class="w-100">
            <input type="text" matInput
                   name="value" [formControl]="targetForm.controls['value']"
                   [(ngModel)]="data.value"
                   placeholder="value" required>
            <mat-error
              *ngIf="targetForm.controls['value'].touched && targetForm.controls['value'].hasError('required')">
              字段不能为空！
            </mat-error>
          </mat-form-field>
        </div>
        <div class="col-2 m-auto">
          <button mat-icon-button type="submit" [disabled]="targetForm.invalid">
            <mat-icon style="color: #3CB371" class="cancelMatIcon">check_circle</mat-icon>
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [``]
})

export class MiniFormComponent {
  @Output() saveFormData = new EventEmitter()
  targetForm: FormGroup

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.targetForm = fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    })
  }

  /**保存所填写的 "key\value"**/
  saveData(data) {
    const temp = {
      key: data.key,
      value: data.value
    }
    this.saveFormData.emit(temp)
  }
}
