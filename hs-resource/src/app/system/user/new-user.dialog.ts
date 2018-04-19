import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {SysUserService} from './sys-user.service'
import appAlert from '../../utils/alert'
import {LocalStorage} from '../../core/services/localstorage.service'

@Component({
  selector: 'app-new-user',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}用户</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="username" [formControl]="targetForm.controls['username']"
                 [(ngModel)]="data.username"
                 placeholder="用户名" required>
          <mat-error
            *ngIf="targetForm.controls['username'].touched && targetForm.controls['username'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100" *ngIf="!data?.id">
          <input matInput type="password"
                 name="password" [formControl]="targetForm.controls['password']"
                 [(ngModel)]="data.password"
                 placeholder="密码" required>
          <mat-error
            *ngIf="targetForm.controls['password'].touched && targetForm.controls['password'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="mobile" [formControl]="targetForm.controls['mobile']"
                 [(ngModel)]="data.mobile"
                 placeholder="手机号码">
          <mat-error
            *ngIf="targetForm.controls['mobile'].touched && targetForm.controls['mobile'].hasError('invalidPhone')">
            请输入正确的手机号码格式！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="email"
                 name="email" [formControl]="targetForm.controls['email']"
                 [(ngModel)]="data.email"
                 placeholder="邮件地址">
          <mat-error
            *ngIf="targetForm.controls['email'].touched && targetForm.controls['email'].hasError('email')">
            请输入正确的邮箱地址格式！
          </mat-error>
        </mat-form-field>
        <mat-form-field *ngIf="isEditRole" class="w-100">
          <mat-select name="roleId" [formControl]="targetForm.controls['roleId']"
                      [(ngModel)]="data.roleId" placeholder="角色" required>
            <mat-option *ngFor="let item of data?.roleIdArr" [value]="item.id">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['roleId'].touched && targetForm.controls['roleId'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field *ngIf="!isEditRole" class="w-100">
          <mat-select [value]="data.roleId" placeholder="角色" [disabled]="!isEditRole">
            <mat-option *ngFor="let item of data?.roleIdArr" [value]="item.id">
              {{item.name}}
            </mat-option>
          </mat-select>
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
export class SysNewUserDialogComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  private username = LocalStorage.get('username')
  isEditRole = true
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysUserService: SysUserService) {
    this.targetForm = fb.group({
      username: ['', Validators.required],
      password: [''],
      mobile: ['', Validators.compose([aliValidators.phone, aliValidators.maxLength(15)])],
      email: ['', Validators.email],
      roleId: [{value: '', disabled: this.data.roleId === 1}],
    })
  }
  ngOnInit() {
    console.log(this.data)
    if (this.data.id && this.username !== 'admin') {
      this.isEditRole = false
    }
  }
  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const path = '/api/system/users'
      const _data = {
        id: data.id,
        mobile: data.mobile || '',
        email: data.email || '',
        roleId: data.roleId
      }
      this.sysUserService.operateSysUser(path, _data, this.dialogRef, this.disabled)
    } else {
      if (data.username === 'admin') {
        appAlert.common.confirmWarning('用户名不能是"admin"！')
      } else {
        this.sysUserService.addSysUser(data, this.dialogRef, this.disabled)// 参数
      }
    }
  }
}
