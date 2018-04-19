import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-revise-password',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="dialogRef.close(data)">
        <h1 class="dialog-head">修改密码</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="username" [formControl]="targetForm.controls['username']"
                 [(ngModel)]="data.username"
                 placeholder="用户名" required>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="password"
                 name="oldPassword" [formControl]="targetForm.controls['oldPassword']"
                 [(ngModel)]="data.oldPassword"
                 placeholder="原密码" required>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="password"
                 name="newPassword" [formControl]="targetForm.controls['newPassword']"
                 [(ngModel)]="data.newPassword"
                 placeholder="新密码" required>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="password"
                 name="newPasswordAgain" [formControl]="targetForm.controls['newPasswordAgain']"
                 [(ngModel)]="data.newPasswordAgain"
                 placeholder="再次确认新密码" required>
        </mat-form-field>
        <div class="dialog-bottom" style="clear:both">
          <button mat-button type="button" class="cancel"
                  (click)="dialogRef.close('cancel')">取消
          </button>
          <button mat-button type="submit" [disabled]="targetForm.invalid"
                  class="sure">确定
          </button>
        </div>
      </form>
    </div>
  `,
})
export class RevisePasswordDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<RevisePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.targetForm = fb.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordAgain: ['', Validators.required]
    })
  }
}
