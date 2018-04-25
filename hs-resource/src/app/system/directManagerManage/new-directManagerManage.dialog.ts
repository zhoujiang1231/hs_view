import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysManagerManageService} from './sys-directManagerManage.service'
import aliValidators from "../../utils/ali-validators";

@Component({
    selector: 'app-new-',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">{{data?.id ? '编辑' : '新建'}}直销经理</h1>
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
                           placeholder="直销经理全称">
                    <mat-error
                            *ngIf="targetForm.controls['fullName'].touched && targetForm.controls['fullName'].hasError('required')">
                        直销经理全称不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <mat-select name="parentId" [formControl]="targetForm.controls['parentId']"
                            [(ngModel)]="data.parentId" placeholder="请选择">
                        <mat-option *ngFor="let item of departMentArr" [value]="item?.id">
                            {{item?.fullName}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['parentId'].touched && targetForm.controls['parentId'].hasError('required')">
                        所属部门不能为空！
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
                    <mat-error
                            *ngIf="targetForm.controls['accountPwdSure'].touched && targetForm.controls['accountPwdSure'].hasError('required')">
                        确认密码不能为空！
                    </mat-error>
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
export class NewManagerDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    targetForm: FormGroup
    isEdit// 判断是处于什么状态：编辑 、新建
    disabled = {value: false}
    departMentArr: any[] = []

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<NewManagerDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysManagerManageService: SysManagerManageService) {
        this.targetForm = fb.group({
            accountName: ['', Validators.required],
            fullName: ['', Validators.required],
            parentId: ['', Validators.required],
            email: ['', Validators.email],
            mobile: ['',Validators.compose([aliValidators.phone,aliValidators.maxLength(11)])],
            tel: [''],
            accountPwd: ['', Validators.required],
            accountPwdSure: ['']
        })
    }

    ngOnInit() {
        this.sysManagerManageService.reloaddirectDepartmentIdAndName()
            .subscribe(page =>{
                this.departMentArr = [...page.data.list]
            })
        if (this.data.id) {// 编辑状态
            this.isEdit = true
            this.isEdit = true
            this.targetForm = this.fb.group({
                accountName: ['', Validators.required],
                fullName: ['', Validators.required],
                parentId: ['', Validators.required],
                email: [''],
                mobile: ['', Validators.compose([aliValidators.phone,aliValidators.maxLength(11)])],
                tel: [''],
                accountPwd: [''],
                accountPwdSure: [''],
            })
        } else {// 新建状态
            this.isEdit = false
        }
    }

    add(data) {
        this.disabled.value = true
        if (this.isEdit) {
            this.sysManagerManageService.operateDirectManager(data, this.dialogRef, this.disabled)
        } else {
            console.log('添加')
            this.sysManagerManageService.addDirectManager(data, this.dialogRef, this.disabled)
        }
    }
}
