import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysProductService} from './sys-product.service'

@Component({
  selector: 'app-edit-product-setting',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新增'}}产品设置</h1>
        <mat-form-field class="w-100">
          <mat-select name="productId" [formControl]="targetForm.controls['productId']"
                      [(ngModel)]="data.productId" placeholder="产品ID">
            <mat-option *ngFor="let item of data?.productIdArr" [value]="item.id">
              {{item.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="name" [formControl]="targetForm.controls['name']"
                      [(ngModel)]="data.name" placeholder="设置名" required>
            <mat-option *ngFor="let item of [{name: 'max_cps'}, {name: 'max_calls'}]" [value]="item.name">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="value" [formControl]="targetForm.controls['value']"
                 [(ngModel)]="data.value"
                 placeholder="设置值">
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="property" [formControl]="targetForm.controls['property']"
                 [(ngModel)]="data.property"
                 placeholder="设置属性">
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="description" [formControl]="targetForm.controls['description']"
                 [(ngModel)]="data.description"
                 placeholder="设置描述">
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
export class SysProductSettingDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysProductSettingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysProductService: SysProductService) {
    this.targetForm = fb.group({
      productId: [{value: '', disabled: true}],
      name: [{value: '', disabled: !!this.data.id}, Validators.required],
      value: [''],
      property: [''],
      description: [''],
    })
  }

  add(data) {
    this.disabled.value = true
    if (data.id) { // 编辑
      this.sysProductService.operateSysProductSetting(data, this.dialogRef, this.disabled) // id数据格式修改
    } else { // 新增
      this.sysProductService.addSysProductSetting(data, this.dialogRef, this.disabled)
    }
  }
}
