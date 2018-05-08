import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysGradeListService} from "./sys-gradeList.service";
import aliValidators from "../../utils/ali-validators";
import {SystemTeacherListComponent} from "../teacherList/system-teacherList.component";
import {SysTeacherListService} from "../teacherList/sys-teacherList.service";
import {ConstantService} from "../../core/services/constant.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {SysStudentListService} from "../studentList/sys-studentList.service";

@Component({
    selector: 'app-sys-gradeList',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 *ngIf="!data.stuId" class="dialog-head">添加成绩</h1>
                <h1 *ngIf="data.stuId" class="dialog-head">修改成绩</h1>
                <mat-form-field class="w-100">
                    <mat-select name="cId" [formControl]="targetForm.controls['cId']" (change)="reloadStudentByCourse(data.cId)"
                                [(ngModel)]="data.cId" placeholder="请选择课程">
                        <mat-option *ngFor="let item of courseList" [value]="item?.cId">
                            {{item?.cName}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['cId'].touched && targetForm.controls['cId'].hasError('required')">
                        课程不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <mat-select name="stuId" [formControl]="targetForm.controls['stuId']"
                                [(ngModel)]="data.stuId" placeholder="请选择学生">
                        <mat-option *ngFor="let item of studentList" [value]="item?.stuId">
                            {{item?.stuName}}
                        </mat-option>
                    </mat-select>
                    <mat-error
                            *ngIf="targetForm.controls['stuId'].touched && targetForm.controls['stuId'].hasError('required')">
                        学生不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="grade" [formControl]="targetForm.controls['grade']"
                           [(ngModel)]="data.grade"
                           placeholder="成绩">
                    <mat-error
                            *ngIf="targetForm.controls['grade'].touched && targetForm.controls['grade'].hasError('required')">
                        成绩不能为空！
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
export class SysGradeListDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    studentList: any =[]
    courseList: any =[]
    gradeList: any =[]
    targetForm: FormGroup
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<SysGradeListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysStudentListService:SysStudentListService,
                private sysGradeListService: SysGradeListService) {
        this.targetForm = fb.group({
            stuId: ['', Validators.required],
            cId: ['', Validators.required],
            grade: ['', Validators.required],
        })
    }
    ngOnInit(){
        if(LocalStorage.get('grade_cId')){
            this.data.cId = LocalStorage.get('grade_cId')
            LocalStorage.remove('grade_cId')
        }
        if(!this.data.stuId) {
            this.sysGradeListService.reloadTeacherCourseListData()
                .subscribe(res =>{
                    if(res.data.result == '0'){
                        this.courseList = [...res.data.list]
                    }
                })
            if (this.data.cId) {
                this.reloadStudentByCourse(this.data.cId)
            }
            LocalStorage.set('add','add')
        }else{
            this.courseList = [{cId:this.data.cId,cName:this.data.cName}]
            this.studentList = [{stuId:this.data.stuId,stuName:this.data.stuName}]
            LocalStorage.set('update','update')
        }
    }

    reloadStudentByCourse(cId){
        this.studentList = []
        this.data.stuId = null
        this.sysStudentListService.reloadStudentByCourse({cId:cId})
            .subscribe(res =>{
                if(res.data.result == '0'){
                    this.studentList = [...res.data.list]
                    this.sysGradeListService.reloadGradeListData({cId:this.data.cId})
                        .subscribe(res =>{
                            if(res.data.result == '0'){
                                this.gradeList = [...res.data.list]
                                this.deleteStudentByGrade(this.studentList,this.gradeList)

                            }
                        })
                }
            })
    }

    /**根据课程查询学生后删除已经有成绩学生**/
    deleteStudentByGrade(row,row1){
        row.forEach(item =>{
            row1.forEach(item1 =>{
                if(item.stuId == item1.stuId) {
                    row.splice(item)
                }
            })
        })
    }

    add(data) {
        this.disabled.value = true
        /**添加**/
        if(LocalStorage.get('add')) {
            this.studentList.forEach(item => {
                if (item.tId == data.tId) {
                    data.cTeacher = item.tName
                }
            })
            this.sysGradeListService.addGrade(data, this.dialogRef, this.disabled)
            LocalStorage.remove('add')
        }
        /**修改**/
        if(LocalStorage.get('update')) {
            this.sysGradeListService.updateGrade(data, this.dialogRef, this.disabled)
            LocalStorage.remove('update')
        }
    }
}
