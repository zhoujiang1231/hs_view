import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysCourseListService} from "./sys-courseList.service";
import aliValidators from "../../utils/ali-validators";
import {SystemTeacherListComponent} from "../teacherList/system-teacherList.component";
import {SysTeacherListService} from "../teacherList/sys-teacherList.service";
import {ConstantService} from "../../core/services/constant.service";
import {LocalStorage} from "../../core/services/localstorage.service";

@Component({
    selector: 'app-sys-courseList',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">添加课程</h1>
                <div class="row">
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="cName" [formControl]="targetForm.controls['cName']"
                           [(ngModel)]="data.cName"
                           placeholder="名称">
                    <mat-error
                            *ngIf="targetForm.controls['cName'].touched && targetForm.controls['cName'].hasError('required')">
                        课程名不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field *ngIf="isPermission == 1" class="w-100">
                    <mat-select name="tId" [formControl]="targetForm.controls['tId']"
                                [(ngModel)]="data.tId" placeholder="教师">
                        <mat-option *ngFor="let item of teacherList" [value]="item?.tId">
                            {{item?.tName}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['tId'].touched && targetForm.controls['tId'].hasError('required')">
                        教师不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                <mat-select name="cType" [formControl]="targetForm.controls['cType']"
                            [(ngModel)]="data.cType" placeholder="类型">
                    <mat-option *ngFor="let item of [{name:'必修',value:0},{name:'选修',value:1}]" [value]="item?.value">
                        {{item?.name}}
                    </mat-option>
                </mat-select>
                <mat-error
                        *ngIf="targetForm.controls['cType'].touched && targetForm.controls['cType'].hasError('required')">
                    类型不能为空！
                </mat-error>
            </mat-form-field>
                <mat-form-field class="w-50">
                    <mat-select name="cTimeMonthData" [formControl]="targetForm.controls['cTimeMonthData']"
                                [(ngModel)]="data.cTimeMonthData" placeholder="上课时间">
                        <mat-option *ngFor="let item of cTimeMonthData" [value]="item?.value">
                            {{item?.value}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['cTimeMonthData'].touched && targetForm.controls['cTimeMonthData'].hasError('required')">
                        上课时间不能为空！
                    </mat-error>
                </mat-form-field>
                    <mat-form-field class="w-50">
                        <mat-select  name="cTimeData" [formControl]="targetForm.controls['cTimeData']"
                                    [(ngModel)]="data.cTimeData" placeholder="上课时间">
                            <mat-option *ngFor="let item of cTimeData" [value]="item?.value">
                                {{item?.value}}
                            </mat-option>
                        </mat-select>
                        <mat-error
                                *ngIf="targetForm.controls['cTimeData'].touched && targetForm.controls['cTimeData'].hasError('required')">
                            上课时间不能为空！
                        </mat-error>
                    </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="cMark" [formControl]="targetForm.controls['cMark']"
                           [(ngModel)]="data.cMark"
                           placeholder="学分">
                    <mat-error
                            *ngIf="targetForm.controls['cMark'].touched && targetForm.controls['cMark'].hasError('required')">
                        学分不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="cHour" [formControl]="targetForm.controls['cHour']"
                           [(ngModel)]="data.cHour"
                           placeholder="学时">
                    <mat-error
                            *ngIf="targetForm.controls['cHour'].touched && targetForm.controls['cHour'].hasError('required')">
                        学时不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="cTotal" [formControl]="targetForm.controls['cTotal']"
                           [(ngModel)]="data.cTotal"
                           placeholder="可选人数">
                    <mat-error
                            *ngIf="targetForm.controls['cTotal'].touched && targetForm.controls['cTotal'].hasError('email')">
                        可选人数不能为空！
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
                </div>
            </form>
        </div>
    `,
})
export class SysCourseListDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    isPermission = 0
    teacherList: any =[]
    targetForm: FormGroup
    disabled = {value: false}
    cTimeData:any = []
    cTimeMonthData:any = []

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<SysCourseListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysTeacherListService:SysTeacherListService,
                private sysCourseListService: SysCourseListService) {
        this.targetForm = fb.group({
            cName: ['', Validators.required],
            cMark: ['', Validators.required],
            cHour: ['', Validators.required],
            tId: [''],
            cType: ['', Validators.required],
            cTotal: ['', Validators.required],
            cTimeData: ['', Validators.required],
            cTimeMonthData: ['', Validators.required],
        })
        this.cTimeData = ConstantService.cTimeData
        this.cTimeMonthData = ConstantService.cTimeMonthData
    }
    ngOnInit(){
        let user:any = LocalStorage.get('user')
        if(user.userType == 0) {
            this.isPermission = 1
            this.sysTeacherListService.reloadTeacherIdAndName()
                .subscribe(res => {
                    if (res.data.result == 0)
                        this.teacherList = [...res.data.list]
                })
        }
    }

    add(data) {
        this.teacherList.forEach( item=>{
            if(item.tId == data.tId){
                data.cTeacher = item.tName
            }
        })
        data.cTime = data.cTimeMonthData+data.cTimeData
        this.disabled.value = true
        this.sysCourseListService.addCourse(data, this.dialogRef, this.disabled)
    }
}
