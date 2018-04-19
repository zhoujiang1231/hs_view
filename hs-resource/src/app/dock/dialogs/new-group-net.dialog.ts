import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {DockGroupService} from '../dock-group.service'
import appAlert from '../../utils/alert'


@Component({
  selector: 'app-new-group-net',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}中继组</h1>
          <mat-form-field class="w-100">
            <input matInput type="text"
                   name="name" [formControl]="targetForm.controls['name']"
                   [(ngModel)]="data.name"
                   placeholder="中继组名" required>
            <mat-error
              *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
              字段不能为空！
            </mat-error>
          </mat-form-field>
          <mat-form-field class="w-100">
            <input matInput type="text"
                   name="location" [formControl]="targetForm.controls['location']"
                   [(ngModel)]="data.location"
                   placeholder="物理位置" required>
            <mat-error
              *ngIf="targetForm.controls['location'].touched && targetForm.controls['location'].hasError('required')">
              字段不能为空！
            </mat-error>
          </mat-form-field>
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
          <mat-form-field class="w-100">
            <input matInput type="text"
                   name="maxCalls" [formControl]="targetForm.controls['maxCalls']"
                   [(ngModel)]="data.maxCalls"
                   placeholder="最大并发数" required>
            <mat-error
              *ngIf="targetForm.controls['maxCalls'].touched && targetForm.controls['maxCalls'].hasError('required')">
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

export class NewGroupNetDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewGroupNetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dockGroupService: DockGroupService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      active: ['', Validators.required],
      maxCalls: ['', Validators.compose([Validators.required, aliValidators.number])]
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        name: data.name || '',
        location: data.location || '',
        description: data.description || '',
        active: data.active,
        maxCalls: data.maxCalls
      }
      this.dockGroupService.operateDockGroup(_data)
        .then(res => {
          console.log('修改中继组', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('修改中继组')
            }
          } else {
            this.disabled.value = false
            console.log(res.data.msg)
            appAlert.common.actionFailed('修改中继组')
          }
        }).catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('修改中继组')
      })
    } else {
      data.maxCalls = Number(data.maxCalls)
      this.dockGroupService.addDockGroup(data)
        .then(res => {
          console.log('新增中继组res', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('新增中继组')
            }
          } else {
            this.disabled.value = false
            console.log(res.data.msg)
            appAlert.common.actionFailed('新增中继组')
          }
        }).catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('新增中继组')
      })
    }
  }
}
