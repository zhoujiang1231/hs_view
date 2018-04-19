import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysProductService} from './sys-product.service'

@Component({
  selector: 'app-new-product',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}产品线</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="name" [formControl]="targetForm.controls['name']"
                 [(ngModel)]="data.name"
                 placeholder="名称" required>
          <mat-error
            *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
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
          <button mat-button type="submit" [disabled]="targetForm.invalid || disabled.value"
                  class="sure">确定
          </button>
        </div>
      </form>
    </div>
  `,
})
export class SysNewProductDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysProductService: SysProductService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      description: [''],
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      this.sysProductService.operateSysProduct(data, this.dialogRef, this.disabled)
    } else {
      this.sysProductService.addSysProduct(data, this.dialogRef, this.disabled)
    }
  }
}
