import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {DockNetService} from '../dock-net.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-new-net',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}网关</h1>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="name" [formControl]="targetForm.controls['name']"
                     [(ngModel)]="data.name"
                     placeholder="网关名" required>
              <mat-error
                *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="ip" [formControl]="targetForm.controls['ip']"
                     [(ngModel)]="data.ip"
                     placeholder="ip地址" required>
              <mat-error
                *ngIf="targetForm.controls['ip'].touched && targetForm.controls['ip'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="port" [formControl]="targetForm.controls['port']"
                     [(ngModel)]="data.port"
                     placeholder="sip端口号" required>
              <mat-error
                *ngIf="targetForm.controls['port'].touched && targetForm.controls['port'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <!--<mat-form-field class="w-100">-->
              <!--<input matInput type="text"-->
                     <!--name="weight" [formControl]="targetForm.controls['weight']"-->
                     <!--[(ngModel)]="data.weight"-->
                     <!--placeholder="权重" required>-->
              <!--<mat-error-->
                <!--*ngIf="targetForm.controls['weight'].touched && targetForm.controls['weight'].hasError('required')">-->
                <!--字段不能为空！-->
              <!--</mat-error>-->
            <!--</mat-form-field>-->
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="areacode" [formControl]="targetForm.controls['areacode']"
                     [(ngModel)]="data.areacode"
                     placeholder="所在地区号" required>
              <mat-error
                *ngIf="targetForm.controls['areacode'].touched && targetForm.controls['areacode'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <mat-select name="active" [formControl]="targetForm.controls['active']"
                          [(ngModel)]="data.active" placeholder="是否激活" required>
                <mat-option *ngFor="let item of [{name: '是', value: 1}, {name: '否', value: 0}]" [value]="item.value">
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
                     name="maxCps" [formControl]="targetForm.controls['maxCps']"
                     [(ngModel)]="data.maxCps"
                     placeholder="容忍的CPS" required>
              <mat-error
                *ngIf="targetForm.controls['maxCps'].touched && targetForm.controls['maxCps'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="maxCalls" [formControl]="targetForm.controls['maxCalls']"
                     [(ngModel)]="data.maxCalls"
                     placeholder="容忍的calls" required>
              <mat-error
                *ngIf="targetForm.controls['maxCalls'].touched && targetForm.controls['maxCalls'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="description" [formControl]="targetForm.controls['description']"
                     [(ngModel)]="data.description"
                     placeholder="设置描述">
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
export class NewNetDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewNetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dockNetService: DockNetService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      ip: ['', Validators.required],
      port: ['', Validators.required],
      // weight: ['', Validators.compose([Validators.required, aliValidators.number])],
      areacode: ['', Validators.required],
      active: ['', Validators.required],
      maxCps: ['', Validators.compose([Validators.required, aliValidators.number])],
      maxCalls: ['', Validators.compose([Validators.required, aliValidators.number])],
      description: ['']
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        name: data.name || '',
        ip: data.ip || '',
        port: data.port || '',
        weight: data.weight,
        areacode: data.areacode || '',
        maxCps: data.maxCps,
        maxCalls: data.maxCalls,
        active: data.active,
        status: 0,
        description: data.description || '',
      }
      this.dockNetService.operateDockNet(_data)
        .then(res => {
          console.log('修改网关', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('修改网关')
            }
          } else {
            this.disabled.value = false
            appAlert.login.failed(res.data.msg || '修改网关失败，请稍后尝试！')
          }
        }).catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('修改网关')
      })
    } else {
      const addData = {
        name: data.name,
        ip: data.ip,
        port: data.port,
        weight: Number(data.weight),
        areacode: data.areacode,
        maxCps: Number(data.maxCps),
        maxCalls: Number(data.maxCalls),
        active: data.active,
        status: 0,
        description: data.description || ''
      }
      this.dockNetService.addDockNet(addData)
        .then(res => {
          console.log('新增网关', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('新增网关')
            }
          } else {
            this.disabled.value = false
            appAlert.login.failed(res.data.msg || '新增网关失败，请稍后尝试！')
          }
        }).catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('新增网关')
      })
    }
  }
}
