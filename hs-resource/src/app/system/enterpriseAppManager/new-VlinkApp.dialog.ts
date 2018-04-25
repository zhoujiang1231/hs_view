import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysEnterpriseAppManagerService} from './sys-enterpriseAppManager.service'
import {LocalStorage} from "../../core/services/localstorage.service";
import appAlert from "../../utils/alert";


@Component({
    selector: 'app-new-VlinkApp',
    template: `
        <div class="redefine-dialog">
            <form (ngSubmit)="add(data)">
                <h1 class="dialog-head">请输入应用ID</h1>
                <mat-form-field class="w-100">
                    <input matInput type="text"
                           name="appId" 
                           [(ngModel)]="data.appId">
                </mat-form-field>
                <div class="dialog-bottom" style="clear:both">
                    <button mat-button type="button" class="cancel"
                            (click)="dialogRef.close('cancel')">取消
                    </button>
                    <button mat-button type="submit"
                            class="sure">确定
                    </button>
                </div>
            </form>
        </div>
    `,
})
export class NewVlinkAppDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    disabled = {value: false}

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<NewVlinkAppDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysEnterpriseFirmMessageService: SysEnterpriseAppManagerService) {
    }

    ngOnInit() {
        if(LocalStorage.get('accountId')){
            this.data.accountId = new Number(LocalStorage.get('accountId'))
        }
    }

    add(data) {
        if(this.data.appId == null){
            appAlert.common.confirmWarning('请输入应用ID')
        }
        this.disabled.value = true
        data.appId = new Number(data.appId)
        this.data.accountId = this.data.accountId
        this.sysEnterpriseFirmMessageService.addVlinkApp(data, this.dialogRef, this.disabled)
    }
}
