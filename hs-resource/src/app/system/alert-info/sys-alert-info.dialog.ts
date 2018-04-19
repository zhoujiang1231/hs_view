import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysAlertService} from './sys-alert.service'

@Component({
  selector: 'app-sys-alert-info',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}告警设置</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="name" [formControl]="targetForm.controls['name']"
                 [(ngModel)]="data.name"
                 placeholder="实时统计组名" required>
          <mat-error
            *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="condition" [formControl]="targetForm.controls['condition']"
                 [(ngModel)]="data.condition"
                 placeholder="配置告警需要的条件" required>
          <mat-error
            *ngIf="targetForm.controls['condition'].touched && targetForm.controls['condition'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="level" [formControl]="targetForm.controls['level']"
                      [(ngModel)]="data.level" placeholder="告警级别" required>
            <mat-option *ngFor="let item of [{name: '警告', value: 1}, {name: '错误', value: 2}]" [value]="item.value">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['level'].touched && targetForm.controls['level'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="type" [formControl]="targetForm.controls['type']"
                      [(ngModel)]="data.type" placeholder="告警类型" required>
            <mat-option *ngFor="let item of [{name: '系统', value: 1}, {name: '业务', value: 2}, {name: '自定义', value: 3}]" [value]="item.value">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['type'].touched && targetForm.controls['type'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="interval" [formControl]="targetForm.controls['interval']"
                      [(ngModel)]="data.interval" placeholder="告警周期" required>
            <mat-option *ngFor="let item of [{name: '1分钟', value: 1},{name: '5分钟', value: 5},
                        {name: '10分钟', value: 10}, {name: '60分钟', value: 60}]" [value]="item.value">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['interval'].touched && targetForm.controls['interval'].hasError('required')">
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
export class SysAlertDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysAlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysAlertService: SysAlertService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      condition: ['', Validators.required],
      level: ['', Validators.required],
      type: ['', Validators.required],
      interval: ['', Validators.required],
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        name: data.name || '',
        description: data.description || '',
        condition: data.condition || '',
        level: data.level,
        type: data.type,
        interval: data.interval,
      }
      this.sysAlertService.operateSysAlert(_data, this.dialogRef, this.disabled) // id数据格式修改
    } else {
      this.sysAlertService.addSysAlert(data, this.dialogRef, this.disabled)
    }
  }
}
