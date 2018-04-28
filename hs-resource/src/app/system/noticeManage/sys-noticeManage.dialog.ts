import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysNoticeManageService} from "./sys-noticeManage.service";
import aliValidators from "../../utils/ali-validators";
import {SystemTeacherListComponent} from "../teacherList/system-teacherList.component";
import {SysTeacherListService} from "../teacherList/sys-teacherList.service";

@Component({
    selector: 'app-sys-courseList',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">添加课程</h1>
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
                <mat-form-field class="w-100">
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
                    <mat-select name="stuSex" [formControl]="targetForm.controls['cType']"
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
    teacherList: any =[]
    targetForm: FormGroup
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<SysCourseListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysTeacherListService:SysTeacherListService,
                private sysCourseListService: SysNoticeManageService) {
        this.targetForm = fb.group({
            cName: ['', Validators.required],
            cMark: ['', Validators.required],
            cHour: ['', Validators.required],
            tId: ['', Validators.required],
            cType: ['', Validators.required],
            cTotal: ['', Validators.required],
        })
    }
    ngOnInit(){
        this.sysTeacherListService.reloadTeacherIdAndName()
            .subscribe(res =>{
                if(res.data.result == 0)
                    this.teacherList = [...res.data.list]
            })
    }

    add(data) {
        this.teacherList.forEach( item=>{
            if(item.tId == data.tId){
                data.cTeacher = item.tName
            }
        })
        this.disabled.value = true
        this.sysCourseListService.addCourse(data, this.dialogRef, this.disabled)
    }
}
