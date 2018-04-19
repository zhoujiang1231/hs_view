import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-sys-param',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="dialogRef.close(data)">
        <h1 class="dialog-head">编辑参数设置</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 [value]="data.name"
                 placeholder="设置名" disabled>
          <!--<input matInput type="text"-->
                 <!--name="name" [formControl]="targetForm.controls['name']"-->
                 <!--[(ngModel)]="data.name"-->
                 <!--placeholder="设置名" required>-->
          <!--<mat-error-->
            <!--*ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">-->
            <!--字段不能为空！-->
          <!--</mat-error>-->
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="value" [formControl]="targetForm.controls['value']"
                 [(ngModel)]="data.value"
                 placeholder="设置的值">
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="property" [formControl]="targetForm.controls['property']"
                 [(ngModel)]="data.property"
                 placeholder="设置的属性" required>
          <mat-error
            *ngIf="targetForm.controls['property'].touched && targetForm.controls['property'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="description" [formControl]="targetForm.controls['description']"
                 [(ngModel)]="data.description"
                 placeholder="描述">
        </mat-form-field>
        <div class="dialog-bottom" style="clear:both">
          <button mat-button type="button" class="cancel"
                  (click)="dialogRef.close('cancel')">取消
          </button>
          <button mat-button type="submit" [disabled]="targetForm.invalid"
                  class="sure">确定
          </button>
        </div>
      </form>
    </div>
  `,
})
export class SysParamDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysParamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.targetForm = fb.group({
      // name: [''],
      value: [''],
      property: ['', Validators.required],
      description: [''],
    })
  }
}
