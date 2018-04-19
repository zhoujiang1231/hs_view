import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {SysAclService} from './sys-acl.service'

@Component({
  selector: 'app-new-acl',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">新建白名单</h1>
        <div class="row">
          <div class="col-12">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="ip" [formControl]="targetForm.controls['ip']"
                     [(ngModel)]="data.ip"
                     placeholder="IP地址" required>
              <mat-error
                *ngIf="targetForm.controls['ip'].touched && targetForm.controls['ip'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <mat-select name="isShow" [formControl]="targetForm.controls['isShow']"
                          [(ngModel)]="data.isShow" placeholder="请选择">
                <mat-option *ngFor="let item of [{name: '平台', value: 0},{name: '业务', value: 1}]" [value]="item.value">
                  {{item.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div class="col-6" *ngIf="data.isShow === 0">
            <mat-form-field class="w-100">
              <mat-select name="domainId" [formControl]="targetForm.controls['domainId']"
                          [(ngModel)]="data.domainId" placeholder="平台ID">
                <mat-option *ngFor="let item of data?.domainIdArr" [value]="item.id">
                  {{item.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <div *ngIf="errorShow" class="difineError">字段不能为空！</div>
          </div>
          <div class="col-6" *ngIf="data.isShow === 1">
            <mat-form-field class="w-100">
              <mat-select name="serviceId" [formControl]="targetForm.controls['serviceId']"
                          [(ngModel)]="data.serviceId" placeholder="业务ID">
                <mat-option *ngFor="let item of data?.serviceIdArr" [value]="item.id">
                  {{item.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <div *ngIf="errorShow" class="difineError">字段不能为空！</div>
          </div>
          <div class="col-12">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="description" [formControl]="targetForm.controls['description']"
                     [(ngModel)]="data.description"
                     placeholder="描述">
            </mat-form-field>
          </div>
        </div>
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
export class SysNewAclDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}
  errorShow = false

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewAclDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysAclService: SysAclService) {
    this.targetForm = fb.group({
      ip: ['', Validators.required],
      description: [''],
      // domainId: ['', Validators.compose([Validators.required, aliValidators.number])],
      // serviceId: ['', Validators.compose([Validators.required, aliValidators.number])]
      domainId: [''],
      serviceId: [''],
      isShow: ['']
    })
    this.data.isShow = 0
  }

  add (data) {
    if (data.isShow === 0) {// 平台
      if (data.domainId) {
        this.addAcl(data)
      } else {
        this.errorShow = true
      }
    } else { // 业务
      if (data.serviceId) {
        this.addAcl(data)
      } else {
        this.errorShow = true
      }
    }
  }

  addAcl(data) {
    this.disabled.value = true
    this.errorShow = false
    const aclData = {
      ip: data.ip,
      description: data.description,
      serviceId: Number(data.serviceId) || '',
      domainId: Number(data.domainId) || ''
    }
    this.sysAclService.addSysAcl(aclData, this.dialogRef, this.disabled)// 参数格式

  }
}
