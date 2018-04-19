import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysTimeListService} from './sys-realtime-list.service'

@Component({
  selector: 'app-new-sys-group',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}实时统计</h1>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="name" [formControl]="targetForm.controls['name']"
                     [(ngModel)]="data.name"
                     placeholder="统计名" required>
              <mat-error
                *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <mat-select name="eventType" [formControl]="targetForm.controls['eventType']"
                          [(ngModel)]="data.eventType" placeholder="事件类型" required>
                <mat-option *ngFor="let item of [{name: 'invite', value: 1}, {name: 'routed', value: 2},
                {name: 'fail route', value: 3}, {name: 'response ring', value: 4}, {name: 'response fail', value: 5},
                {name: 'answer', value: 6}, {name: 'bye', value: 7}]" [value]="item.value">
                  {{item.name}}
                </mat-option>
              </mat-select>
              <mat-error
                *ngIf="targetForm.controls['eventType'].touched && targetForm.controls['eventType'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <mat-select name="statisticGroupId" [formControl]="targetForm.controls['statisticGroupId']"
                          [(ngModel)]="data.statisticGroupId" placeholder="实时统计组" required>
                <mat-option *ngFor="let item of data?.sysTimeGroupDataArr" [value]="item.id">
                  {{item.name}}
                </mat-option>
              </mat-select>
              <mat-error
                *ngIf="targetForm.controls['statisticGroupId'].touched && targetForm.controls['statisticGroupId'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="displayName" [formControl]="targetForm.controls['displayName']"
                     [(ngModel)]="data.displayName"
                     placeholder="显示名" required>
              <mat-error
                *ngIf="targetForm.controls['displayName'].touched && targetForm.controls['displayName'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <!--<mat-select name="condition" [formControl]="targetForm.controls['condition']"-->
                          <!--[(ngModel)]="data.condition" placeholder="统计值所需条件" required>-->
                <!--<mat-option *ngFor="let item of [{name: '是', value: 1}, {name: '否', value: 0}]" [value]="item.value">-->
                  <!--{{item.name}}-->
                <!--</mat-option>-->
              <!--</mat-select>-->
              <input matInput type="text"
                     name="condition" [formControl]="targetForm.controls['condition']"
                     [(ngModel)]="data.condition"
                     placeholder="统计值所需条件" required>
              <mat-error
                *ngIf="targetForm.controls['condition'].touched && targetForm.controls['condition'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
          <div class="col-6">
            <mat-form-field class="w-100">
              <mat-select name="increaseType" [formControl]="targetForm.controls['increaseType']"
                          [(ngModel)]="data.increaseType" placeholder="增加的数值类型" required>
                <mat-option *ngFor="let item of [{name: '数值', value: 1}, {name: '变量', value: 2}]" [value]="item.value">
                  {{item.name}}
                </mat-option>
              </mat-select>
              <mat-error
                *ngIf="targetForm.controls['increaseType'].touched && targetForm.controls['increaseType'].hasError('required')">
                字段不能为空！
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <mat-form-field class="w-100">
              <input matInput type="text"
                     name="increaseValue" [formControl]="targetForm.controls['increaseValue']"
                     [(ngModel)]="data.increaseValue"
                     placeholder="增加的值" required>
              <mat-error
                *ngIf="targetForm.controls['increaseValue'].touched && targetForm.controls['increaseValue'].hasError('required')">
                字段不能为空！
              </mat-error>
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
export class SysNewStatisticDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewStatisticDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysTimeListService: SysTimeListService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      eventType: ['', Validators.required],
      statisticGroupId: ['', Validators.required],
      displayName: ['', Validators.required],
      condition: ['', Validators.required],
      increaseType: ['', Validators.required],
      increaseValue: ['', Validators.required],
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      this.sysTimeListService.operateSysTimeList(data, this.dialogRef, this.disabled) // id数据格式修改
    } else {
      this.sysTimeListService.addSysTimeList(data, this.dialogRef, this.disabled)// 数据格式
    }
  }
}
