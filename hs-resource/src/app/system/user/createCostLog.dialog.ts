import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {LocalStorage} from "../../core/services/localstorage.service";
import {SysUserService} from "./sys-user.service";

@Component({
    selector: 'system-createCostLog',
    template: `
        <div class="redefine-dialog">
            <div>
                <h1 class="dialog-head">请输入企业ID,以逗号分隔,不写表示所有</h1>
                <div class="w-100">
                    <input type="text"
                           name="appId"
                           class="w-100"
                           [(ngModel)]="data.customerIdArrStr">
                </div>
                <div class="dialog-bottom" style="clear:both">
                    <button mat-button type="button" class="cancel"
                            (click)="dialogRef.close('cancel')">取消
                    </button>
                    <button type="button"
                            class="sure"
                            (click)="createCostLog(data)">确定
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class CreateCostLogDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<CreateCostLogDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysUserService:SysUserService) {
    }

    ngOnInit() {
        if(LocalStorage.get('accountId')){
            this.data.accountId = new Number(LocalStorage.get('accountId'))
        }
    }

    createCostLog(data) {
        if(LocalStorage.get('customerDeductLog')){
            this.sysUserService.createCostLog(data)
            LocalStorage.remove('customerDeductLog')
        }
        if(LocalStorage.get('preDeductLog')){
            this.sysUserService.preDeductLog(data)
            LocalStorage.remove('preDeductLog')
        }
        this.dialogRef.close('success')
    }
}
