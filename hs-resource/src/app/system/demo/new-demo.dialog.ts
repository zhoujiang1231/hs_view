import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysDemoService} from './sys-demo.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-new-demo',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}实例</h1>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="name" [formControl]="targetForm.controls['name']"
                     [(ngModel)]="data.name"
                     placeholder="实例设置名称" required>
              <mat-error
                *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="port" [formControl]="targetForm.controls['port']"
                     [(ngModel)]="data.port"
                     placeholder="端口">
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="miUrl" [formControl]="targetForm.controls['miUrl']"
                     [(ngModel)]="data.miUrl"
                     placeholder="mi接口地址" required>
              <mat-error
                *ngIf="targetForm.controls['miUrl'].touched && targetForm.controls['miUrl'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
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
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="ip" [formControl]="targetForm.controls['ip']"
                     [(ngModel)]="data.ip"
                     placeholder="sip-router ip" required>
              <mat-error
                *ngIf="targetForm.controls['ip'].touched && targetForm.controls['ip'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="externalIp" [formControl]="targetForm.controls['externalIp']"
                     [(ngModel)]="data.externalIp"
                     placeholder="sip-router 外网ip">
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="dns" [formControl]="targetForm.controls['dns']"
                     [(ngModel)]="data.dns"
                     placeholder="dns域名">
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="externalDns" [formControl]="targetForm.controls['externalDns']"
                     [(ngModel)]="data.externalDns"
                     placeholder="dns外网域名">
            </mat-form-field>
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
                  (click)="dialogRef.close('cancel')">取消</button>
          <button mat-button type="submit" [disabled]="targetForm.invalid || disabled.value"
                  class="sure">确定
          </button>
        </div>
      </form>
    </div>
  `,
})
export class SysNewDemoDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewDemoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysDemoService: SysDemoService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      ip: ['', Validators.required],
      active: ['', Validators.required],
      miUrl: ['', Validators.required],
      externalDns: [''],
      dns: [''],
      externalIp: [''],
      port: ['']
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        name: data.name || '',
        description: data.description || '',
        ip: data.ip || '',
        miUrl: data.miUrl || '',
        active: data.active,
        dns: data.dns,
        externalDns: data.externalDns,
        externalIp: data.externalIp,
        port: data.port
      }
      this.sysDemoService.operateSysDemo(_data)
        .then(res => {
          console.log('修改实例', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('修改实例')
            }
          } else {
            this.disabled.value = false
            console.log(res.data.msg)
            appAlert.common.actionFailed('修改实例')
          }
        }).catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('修改实例')
      })
    } else {
      this.sysDemoService.addSysDemo(data)
        .then(res => {
          console.log('新增路由post', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('新增实例')
            }
          } else {
            this.disabled.value = false
            console.log(res.data.msg)
            appAlert.common.actionFailed('新增实例')
          }
        }).catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('新增实例')
        })
    }
  }
}
