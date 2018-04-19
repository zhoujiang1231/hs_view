import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {SysProductService} from '../product/sys-product.service'
import {SysPlatformService} from './sys-platform.service'

@Component({
  selector: 'app-new-platform',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}平台</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="name" [formControl]="targetForm.controls['name']"
                 [(ngModel)]="data.name"
                 placeholder="平台名称" required>
          <mat-error
            *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <!--<input matInput type="text"-->
                 <!--name="productId" [formControl]="targetForm.controls['productId']"-->
                 <!--[(ngModel)]="data.productId"-->
                 <!--placeholder="产品ID" required>-->
          <mat-select name="productId" [formControl]="targetForm.controls['productId']"
                      [(ngModel)]="data.productId" placeholder="产品ID">
            <mat-option *ngFor="let item of data?.productIdArr" [value]="item.id">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['productId'].touched && targetForm.controls['productId'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="callbackUrl" [formControl]="targetForm.controls['callbackUrl']"
                 [(ngModel)]="data.callbackUrl"
                 placeholder="回调URL">
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
export class SysNewPlatDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewPlatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysProductService: SysProductService,
              private sysPlatformService: SysPlatformService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      callbackUrl: [''],
      productId: ['', Validators.compose([Validators.required, aliValidators.number])],
      description: [''],
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        name: data.name || '',
        callbackUrl: data.callbackUrl || '',
        productId: data.productId,
        description: data.description || ''
      }
      this.sysPlatformService.operateSysPlatform(_data, this.dialogRef, this.disabled)
    } else {
      data.productId = Number(data.productId)
      this.sysPlatformService.addSysPlatform(data, this.dialogRef, this.disabled)
    }
  }
}
