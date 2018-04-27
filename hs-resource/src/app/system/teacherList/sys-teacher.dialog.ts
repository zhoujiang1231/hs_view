import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysTeacherListService} from "./sys-teacherList.service";
import aliValidators from "../../utils/ali-validators";

@Component({
    selector: 'app-sys-teacherList',
    template: `
        <div class="redefine-dialog">
            <form [formGroup]="targetForm" (ngSubmit)="add(data)">
                <h1 class="dialog-head">添加教师</h1>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="tName" [formControl]="targetForm.controls['tName']"
                           [(ngModel)]="data.tName"
                           placeholder="姓名">
                    <mat-error
                            *ngIf="targetForm.controls['tName'].touched && targetForm.controls['tName'].hasError('required')">
                        姓名不能为空！
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="tPassword" [formControl]="targetForm.controls['tPassword']"
                           [(ngModel)]="data.tPassword"
                           placeholder="密码">
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
export class SysTeacherListDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    targetForm: FormGroup
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<SysTeacherListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysTeacherListService: SysTeacherListService) {
        this.targetForm = fb.group({
            tPassword: [''],
            tName: ['', Validators.required],
        })
    }
    ngOnInit(){
    }

    add(data) {
        this.disabled.value = true
        this.sysTeacherListService.addTeacher(data, this.dialogRef, this.disabled)
    }
}
