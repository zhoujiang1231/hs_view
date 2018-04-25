import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysDitectDepartmentManageService} from './sys-directDepartmentManage.service'
import aliValidators from '../../utils/ali-validators'

@Component({
    selector: 'app-new-directDepartmentManage',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}直销部门</h1>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="accountName" [formControl]="targetForm.controls['accountName']"
                           [(ngModel)]="data.accountName"
                           placeholder="登录名" required>
                    <mat-error
                            *ngIf="targetForm.controls['accountName'].touched && targetForm.controls['accountName'].hasError('required')">
                        登录名不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="fullName" [formControl]="targetForm.controls['fullName']"
                           [(ngModel)]="data.fullName"
                           placeholder="部门全称">
                    <mat-error
                            *ngIf="targetForm.controls['fullName'].touched && targetForm.controls['fullName'].hasError('required')">
                        部门全称不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="email" [formControl]="targetForm.controls['email']"
                           [(ngModel)]="data.email"
                           placeholder="邮箱">
                    <mat-error
                            *ngIf="targetForm.controls['email'].touched && targetForm.controls['email'].hasError('email')">
                        请输入正确的邮箱地址格式！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="mobile" [formControl]="targetForm.controls['mobile']"
                           [(ngModel)]="data.mobile"
                           placeholder="手机号">
                    <mat-error
                            *ngIf="targetForm.controls['mobile'].touched && targetForm.controls['mobile'].hasError('invalidPhone')">
                        请输入正确的手机号码格式！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="tel" [formControl]="targetForm.controls['tel']"
                           [(ngModel)]="data.tel"
                           placeholder="固定电话">
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="password"
                           name="accountPwd" [formControl]="targetForm.controls['accountPwd']"
                           [(ngModel)]="data.accountPwd"
                           placeholder="密码">
                    <mat-error
                            *ngIf="targetForm.controls['accountPwd'].touched && targetForm.controls['accountPwd'].hasError('required')">
                        密码不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field *ngIf="!data.id" class="w-100">
                    <input matInput type="password"
                           name="accountPwdSure" [formControl]="targetForm.controls['accountPwdSure']"
                           [(ngModel)]="data.accountPwdSure"
                           placeholder="确认密码">
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
export class NewDirectDepartmentManageDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    targetForm: FormGroup
    isEdit// 判断是处于什么状态：编辑 、新建
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<NewDirectDepartmentManageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysProductService: SysDitectDepartmentManageService) {
        this.targetForm = fb.group({
            accountName: ['', Validators.required],
            fullName: ['', Validators.required],
            email: ['', Validators.email||Validators.nullValidator],
            mobile: ['', Validators.compose([aliValidators.phone,aliValidators.maxLength(11)])],
            tel: [''],
            accountPwd: ['', Validators.required],
            accountPwdSure: [''],
        })
    }

    ngOnInit() {
        if (this.data.id) {// 编辑状态
            this.isEdit = true
            this.targetForm = this.fb.group({
                accountName: ['', Validators.required],
                fullName: ['', Validators.required],
                email: ['', Validators.email],
                mobile: ['', Validators.compose([aliValidators.phone,aliValidators.maxLength(11)])],
                tel: [''],
                accountPwd: [''],
                accountPwdSure: [''],
            })
        } else {// 新建状态
            this.isEdit = false
        }
    }
    /*验证重复密码是否一致*/
    /*confirmPassword() {
        console.log(this.data)
        if(!this.data.id){
            if(this.data.accountName&&this.data.fullName&&this.data.accountPwd&&this.data.accountPwd==this.data.accountPwdSure) {
                this.disabled.value = true
            }
            else{
                this.disabled.value = false
            }
        }
        else {
            this.disabled.value = true
        }
        console.log(this.disabled)
    }*/

    add(data) {
        this.disabled.value = true
        if (this.isEdit) {
            this.sysProductService.operateDirectDepartment(data, this.dialogRef, this.disabled)
        } else {
            this.sysProductService.addDirectDepartment(data, this.dialogRef, this.disabled)
        }
    }
}
