import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {BusinessListService} from '../business-list.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-new-business-list',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}业务</h1>
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
                 name="prefix" [formControl]="targetForm.controls['prefix']"
                 [(ngModel)]="data.prefix"
                 placeholder="前缀" required>
          <mat-error
            *ngIf="targetForm.controls['prefix'].touched && targetForm.controls['prefix'].hasError('required')">
            字段不能为空，且无需支持正则表达式；100-999之间的3位数字，不能重复！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="domainId" [formControl]="targetForm.controls['domainId']"
                      [(ngModel)]="data.domainId" placeholder="平台ID" required>
            <mat-option *ngFor="let item of data?.domainIdArr" [value]="item.id">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['domainId'].touched && targetForm.controls['domainId'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="active" [formControl]="targetForm.controls['active']"
                      [(ngModel)]="data.active" placeholder="是否激活" required>
            <mat-option *ngFor="let item of [{name: '激活', value: 1}, {name: '未激活', value: 0}]" [value]="item.value">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['active'].touched && targetForm.controls['active'].hasError('required')">
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
          <button mat-button type="button" class="cancel" (click)="dialogRef.close('cancel')">取消
          </button>
          <button mat-button type="submit" class="sure" [disabled]="targetForm.invalid || disabled.value">确定</button>
        </div>
      </form>
    </div>
  `,
})
export class NewBusinessListDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewBusinessListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private businessListService: BusinessListService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      prefix: ['', Validators.compose([Validators.required, aliValidators.length(3)])],
      domainId: ['', Validators.compose([Validators.required, aliValidators.number])],
      description: [''],
      active: ['', Validators.required],
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        name: data.name || '',
        prefix: data.prefix || '',
        domainId: Number(data.domainId),
        description: data.description || '',
        active: data.active
      }
      this.businessListService.operateBusinessList(_data)
        .then(res => {
          console.log('修改业务', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('修改业务')
            }
          } else {
            this.disabled.value = false
            console.log(res.data.msg)
            appAlert.common.actionFailed('修改业务')
          }
        })
        .catch(err => {
          this.disabled.value = false
          appAlert.common.actionFailed('修改业务')
      })
    } else {
      data.domainId = Number(data.domainId)
      this.businessListService.addBusinessList(data)
        .then(res => {
          console.log('新增业务res', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('新增业务')
            }
          } else {
            this.disabled.value = false
            appAlert.login.failed(res.data.msg || '新增业务失败，请稍后尝试！')
          }
        })
        .catch(err => {
          this.disabled.value = false
          appAlert.common.actionFailed('新增业务')
      })
    }
  }
}
