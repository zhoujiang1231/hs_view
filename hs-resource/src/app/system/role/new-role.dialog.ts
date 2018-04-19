import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysRoleService} from './sys-role.service'

@Component({
  selector: 'app-new-role',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}角色</h1>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="name" [formControl]="targetForm.controls['name']"
                 [(ngModel)]="data.name"
                 placeholder="角色名称" required>
          <mat-error
            *ngIf="targetForm.controls['name'].touched && targetForm.controls['name'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="description" [formControl]="targetForm.controls['description']"
                 [(ngModel)]="data.description"
                 placeholder="描述">
        </mat-form-field>
        <!--<mat-form-field class="w-100">-->
          <!--<mat-select name="manageModule" [formControl]="targetForm.controls['manageModule']"-->
                      <!--[ngModel]="data.manageModule" placeholder="管理模块" required>-->
            <!--<mat-option *ngFor="let item of [{name: '是', value: 1}, {name: '否', value: 0}]" [value]="item.value">-->
              <!--{{item.name}}-->
            <!--</mat-option>-->
          <!--</mat-select>-->
        <!--</mat-form-field>-->
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
export class SysNewRoleDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SysNewRoleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysRoleService: SysRoleService) {
    this.targetForm = fb.group({
      name: ['', Validators.required],
      description: [''],
    })
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      this.sysRoleService.operateSysRole(data, this.dialogRef, this.disabled) // id数据格式修改
    } else {
      this.sysRoleService.addSysRole(data, this.dialogRef, this.disabled)
    }
  }
}
