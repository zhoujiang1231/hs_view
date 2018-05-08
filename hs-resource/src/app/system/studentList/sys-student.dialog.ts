import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysStudentListService} from "./sys-studentList.service";
import aliValidators from "../../utils/ali-validators";

@Component({
    selector: 'app-sys-studentList',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">添加学生</h1>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuName" [formControl]="targetForm.controls['stuName']"
                           [(ngModel)]="data.stuName"
                           placeholder="姓名">
                    <mat-error
                            *ngIf="targetForm.controls['stuName'].touched && targetForm.controls['stuName'].hasError('required')">
                        姓名不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuNo" [formControl]="targetForm.controls['stuNo']"
                           [(ngModel)]="data.stuNo"
                           placeholder="学号">
                    <mat-error
                            *ngIf="targetForm.controls['stuNo'].touched && targetForm.controls['stuNo'].hasError('required')">
                        学号不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <mat-select name="stuSex" [formControl]="targetForm.controls['stuSex']"
                                [(ngModel)]="data.stuSex" placeholder="性别">
                        <mat-option *ngFor="let item of [{name:'男',value:0},{name:'女',value:1}]" [value]="item?.value">
                            {{item?.name}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['stuSex'].touched && targetForm.controls['stuSex'].hasError('required')">
                        性别不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuDepart" [formControl]="targetForm.controls['stuDepart']"
                           [(ngModel)]="data.stuDepart"
                           placeholder="院系">
                    <mat-error
                            *ngIf="targetForm.controls['stuDepart'].touched && targetForm.controls['stuDepart'].hasError('required')">
                        院系不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuIdcard" [formControl]="targetForm.controls['stuIdcard']"
                           [(ngModel)]="data.stuIdcard"
                           placeholder="身份证">
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuEmail" [formControl]="targetForm.controls['stuEmail']"
                           [(ngModel)]="data.stuEmail"
                           placeholder="邮箱">
                    <mat-error
                            *ngIf="targetForm.controls['stuEmail'].touched && targetForm.controls['stuEmail'].hasError('email')">
                        请输入正确的邮箱地址格式！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuTel" [formControl]="targetForm.controls['stuTel']"
                           [(ngModel)]="data.stuTel"
                           placeholder="手机号">
                    <mat-error
                            *ngIf="targetForm.controls['stuTel'].touched && targetForm.controls['stuTel'].hasError('invalidPhone')">
                        请输入正确的手机号码格式！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="stuAddress" [formControl]="targetForm.controls['stuAddress']"
                           [(ngModel)]="data.stuAddress"
                           placeholder="住址">
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
export class SysStudentListDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    targetForm: FormGroup
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<SysStudentListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysStudentListService: SysStudentListService) {
        this.targetForm = fb.group({
            stuNo: ['', Validators.required],
            stuName: ['', Validators.required],
            stuSex: ['', Validators.required],
            stuDepart: [''],
            stuIdcard: [''],
            stuAddress: ['', Validators.required],
            stuEmail: ['', Validators.email],
            stuTel: ['', Validators.compose([aliValidators.phone, aliValidators.maxLength(11)])],
        })
    }
    ngOnInit(){
    }

    add(data) {
        this.disabled.value = true
        this.sysStudentListService.addStudent(data, this.dialogRef, this.disabled)
    }
}
