import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysCustomerManageService} from "./sys-customerManage.service";
import appAlert from '../../utils/alert'
import aliValidators from "../../utils/ali-validators";
import {SystemDirectDepartmentManageComponent} from "../directDepartmentManage/system-directDepartmentManage.component";
import {SysManagerManageService} from "../directManagerManage/sys-directManagerManage.service";

@Component({
    selector: 'app-sys-customerManage',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">新增企业</h1>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="customerName" [formControl]="targetForm.controls['customerName']"
                           [(ngModel)]="data.customerName"
                           placeholder="登录名">
                    <mat-error
                            *ngIf="targetForm.controls['customerName'].touched && targetForm.controls['customerName'].hasError('required')">
                        登录名不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <mat-select name="parentParentId" [formControl]="targetForm.controls['parentParentId']"
                                [(ngModel)]="data.parentParentId" (change)="getdirectMangerData()" placeholder="所属部门">
                        <mat-option *ngFor="let item of departMentArr" [value]="item?.id">
                            {{item?.fullName}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <mat-select name="parentId" [formControl]="targetForm.controls['parentId']"
                                [(ngModel)]="data.parentId" placeholder="所属经理">
                        <mat-option *ngFor="let item of departManagerArr" [value]="item?.id">
                            {{item?.fullName}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['parentId'].touched && targetForm.controls['parentId'].hasError('required')">
                        所属经理不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="accountFullName" [formControl]="targetForm.controls['accountFullName']"
                           [(ngModel)]="data.accountFullName"
                           placeholder="账户全称">
                    <mat-error
                            *ngIf="targetForm.controls['accountFullName'].touched && targetForm.controls['accountFullName'].hasError('required')">
                        账户全称不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="fullName" [formControl]="targetForm.controls['fullName']"
                           [(ngModel)]="data.fullName"
                           placeholder="企业全称">
                    <mat-error
                            *ngIf="targetForm.controls['fullName'].touched && targetForm.controls['fullName'].hasError('required')">
                        企业全称不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="shortName" [formControl]="targetForm.controls['shortName']"
                           [(ngModel)]="data.shortName"
                           placeholder="企业简称">
                    <mat-error
                            *ngIf="targetForm.controls['shortName'].touched && targetForm.controls['shortName'].hasError('required')">
                        企业简称不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="principal" [formControl]="targetForm.controls['principal']"
                           [(ngModel)]="data.principal"
                           placeholder="姓名">
                    <mat-error
                            *ngIf="targetForm.controls['principal'].touched && targetForm.controls['principal'].hasError('required')">
                        姓名不能为空！
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
                           name="customerPassword" [formControl]="targetForm.controls['customerPassword']"
                           [(ngModel)]="data.customerPassword"
                           placeholder="密码">
                    <mat-error
                            *ngIf="targetForm.controls['customerPassword'].touched && targetForm.controls['customerPassword'].hasError('required')">
                        密码不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="password"
                           name="customerPasswordPwdSure" [formControl]="targetForm.controls['customerPasswordPwdSure']"
                           [(ngModel)]="data.customerPasswordPwdSure"
                           placeholder="确认密码">
                    <mat-error
                            *ngIf="targetForm.controls['customerPasswordPwdSure'].touched && targetForm.controls['customerPasswordPwdSure'].hasError('required')">
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
export class SysCustomerManageDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    targetForm: FormGroup
    departMentArr: any[] = []
    departManagerArr: any[] = []
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<SysCustomerManageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysCustomerManageService: SysCustomerManageService,
                private sysManagerManageService:SysManagerManageService) {
        this.targetForm = fb.group({
            customerName: ['', Validators.required],
            parentParentId: [''],
            parentId: ['', Validators.required],
            accountFullName: ['', Validators.required],
            fullName: ['', Validators.required],
            shortName: ['', Validators.required],
            principal: ['', Validators.required],
            email: ['', Validators.email],
            mobile: ['', Validators.compose([aliValidators.phone, aliValidators.maxLength(11)])],
            tel: [''],
            customerPassword: ['', Validators.required],
            customerPasswordPwdSure: [''],
        })
    }
    ngOnInit(){
        this.sysManagerManageService.reloaddirectDepartmentIdAndName()
            .subscribe(page =>{
                if(page.data.result == 0){
                    this.departMentArr = [...page.data.list]
                    this.data.parentParentId = this.departMentArr[1].id
                }
            })
        this.sysCustomerManageService.reloaddirectMangerData({directDepartmentId:this.departMentArr[1].id})
            .subscribe(page =>{
                if(page.data.result === '0'){
                    this.departManagerArr = [...page.data.list]
                    this.data.parentId = this.departManagerArr[0].id
                }
            })
    }

    /*所属部门改变时获取直销经理下拉框*/
    getdirectMangerData(){
        this.sysCustomerManageService.reloaddirectMangerData({directDepartmentId:this.data.parentParentId})
            .subscribe(page =>{
                if(page.data.result === '0'){
                    this.departManagerArr = [...page.data.list]
                    this.data.parentId = this.departManagerArr[0].id
                }
            })
    }

    add(data) {
        this.disabled.value = true
        this.sysCustomerManageService.addCustomer(data, this.dialogRef, this.disabled)
    }
}
