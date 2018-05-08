import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import appAlert from '../../utils/alert'
import {LocalStorage} from "../../core/services/localstorage.service";
import {Md5} from "ts-md5";
import {SysUserService} from "../user/sys-user.service";
import {ConnectionService} from "../../core/services/connection.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sys-modifyPassword',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="updatePassword(data)">
                <h1 class="dialog-head">修改密码</h1>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="oldPsw" [formControl]="targetForm.controls['oldPsw']"
                           [(ngModel)]="data.oldPsw"
                           placeholder="旧密码">
                    <mat-error
                            *ngIf="targetForm.controls['oldPsw'].touched && targetForm.controls['oldPsw'].hasError('required')">
                        旧密码不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="accountPwd" [formControl]="targetForm.controls['accountPwd']"
                           [(ngModel)]="data.accountPwd"
                           placeholder="新密码">
                    <mat-error
                            *ngIf="targetForm.controls['accountPwd'].touched && targetForm.controls['accountPwd'].hasError('required')">
                        新密码不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="accountPwdAgain" [formControl]="targetForm.controls['accountPwdAgain']"
                           [(ngModel)]="data.accountPwdAgain"
                           placeholder="重复密码">
                    <mat-error
                            *ngIf="targetForm.controls['accountPwdAgain'].touched && targetForm.controls['accountPwdAgain'].hasError('required')">
                        重复密码不能为空！
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
export class ModifyPasswordDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    targetForm: FormGroup
    disabled = {value: false}
    user: any = {}
    password

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<ModifyPasswordDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router,
                private connectionService:ConnectionService,
                private sysUserService:SysUserService) {
        this.targetForm = fb.group({
            oldPsw: ['', Validators.required],
            accountPwd: ['',Validators.required],
            accountPwdAgain: ['',Validators.required],
        })
    }
    ngOnInit(){
        this.user = LocalStorage.get('user')
        if(this.user.userType == 0){
            this.data.userId = this.user.adminId
            this.password = this.user.adminPassword
        }
        if(this.user.userType == 1){
            this.data.userId = this.user.tId
            this.password = this.user.tPassword
        }
        if(this.user.userType == 2){
            this.data.userId = this.user.stuId
            this.password = this.user.stuPassword
        }
    }

    updatePassword(data) {
        let oldPassword:string = this.password
        let oldPswMd5:string = Md5.hashStr(data.oldPsw).toString()
        if(!(oldPswMd5 == oldPassword)){
            appAlert.common.actionFailed('旧密码输入错误！')
            return
        }
        if(!(data.accountPwdAgain == data.accountPwd)){
            appAlert.common.actionFailed('两次密码输入不一致！')
            return
        }

        this.sysUserService.modifyPsw({userId:data.userId,authCode:data.accountPwd}, this.dialogRef, this.disabled)
            .subscribe(res => {
                if (res.data.result === '0') {
                    appAlert.common.confirmWarning('修改密码成功,请退出重新登录！')
                        .then(res=>this.exit())
                } else {
                    appAlert.common.actionFailed(res.data.description)
                }
            },err => {
                appAlert.common.actionFailed('修改密码失败')
            })

    }
    exit() {
        const path = '/user/logout'
        this.connectionService.get(path)
            .then(res => {
                if (res.data.result === '0') {
                    this.connectionService.logout()
                    this.router.navigate(['/signin'])
                    localStorage.clear()
                } else {
                    appAlert.login.failed('退出登录失败，请重试！')
                }
            }).catch(error => {
            appAlert.login.failed('退出登录失败，请重试！')
        })
    }

}
