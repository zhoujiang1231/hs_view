import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-alert-new',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="dialogRef.close(data)">
        <h1 class="dialog-head">新建告警信息</h1>
        <mat-form-field class="w-100">
          <mat-select name="level" [formControl]="targetForm.controls['level']"
                      [(ngModel)]="data.level" placeholder="告警级别" required>
            <mat-option *ngFor="let item of [{name: '告警', value: 1}, {name: '错误', value: 2}]" [value]="item.value">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['level'].touched && targetForm.controls['level'].hasError('level')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="type" [formControl]="targetForm.controls['type']"
                      [(ngModel)]="data.type" placeholder="告警类别" required>
            <mat-option *ngFor="let item of [{name: '系统', value: 1}, {name: '业务', value: 2}, {name: '自定义', value: 3}]" [value]="item.value">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['type'].touched && targetForm.controls['type'].hasError('type')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="name" [formControl]="targetForm.controls['name']"
                 [(ngModel)]="data.name"
                 placeholder="名字" required>
          <mat-error
            *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('name')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="description" [formControl]="targetForm.controls['description']"
                 [(ngModel)]="data.description"
                 placeholder="描述">
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="msg" [formControl]="targetForm.controls['msg']"
                 [(ngModel)]="data.msg"
                 placeholder="告警信息" required>
          <mat-error
            *ngIf="targetForm.controls['msg'].touched && targetForm.controls['msg'].hasError('msg')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <div class="dialog-bottom" style="clear:both">
          <button mat-button type="button" class="cancel" (click)="dialogRef.close('cancel')">取消
          </button>
          <button mat-button type="submit" class="sure" [disabled]="targetForm.invalid">确定
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AlertNewInfoDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AlertNewInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.targetForm = fb.group({
      level: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      msg: ['', Validators.required],
    })
  }
}
