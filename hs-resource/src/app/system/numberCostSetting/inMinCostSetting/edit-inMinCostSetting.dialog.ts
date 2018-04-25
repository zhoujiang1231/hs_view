import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysInMinCostSettingService} from "./sys-inMinCostSetting.service";
import {FlatpickrOptions} from "ng2-flatpickr";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from "moment";
import {LocalStorage} from "../../../core/services/localstorage.service";
import {SysNumberFunctionSettingService} from "../numberFunctionSetting/sys-numberFunctionSetting.service";
import {SysAppFunctionSettingService} from "../appFunctionSetting/sys-appFunctionSetting.service";

@Component({
    selector: 'app-edit-inMinCostSetting',
    template: `
        <div class="redefine-dialog">
            <div class="h-100 position-relative">
                <div class="row head-search-container">
                    <div class="w-100 container-input">
                        <dl>
                            <dt>资费ID</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.id" readonly>
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input" *ngIf="data.updateId==0">
                        <dl>
                            <dt>热线号码</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.hotline" readonly>
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input" *ngIf="data.updateId==1">
                        <dl>
                            <dt>区号</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.areaCode" readonly>
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input" *ngIf="data.updateId==1">
                        <dl>
                            <dt>号码</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.trunk" readonly>
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input" *ngIf="data.updateId==2">
                        <dl>
                            <dt>功能名称</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.name" readonly>
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input" *ngIf="data.updateId==0">
                        <dl>
                            <dt>低消</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.minCost">
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input" *ngIf="data.updateId==1 || data.updateId==2">
                        <dl>
                            <dt>功能费</dt>
                            <dd>
                                <mat-form-field class="right-input" [floatPlaceholder]="'never'">
                                    <input matInput [(ngModel)]="data.cost">
                                </mat-form-field>
                            </dd>
                        </dl>
                    </div>
                    <div class="w-100 container-input">
                        <dl>
                            <dt>起始月份</dt>
                            <dd class="range-flatpickr">
                                <ng2-flatpickr [config]="startTimeOptions"></ng2-flatpickr>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="dialog-bottom" style="clear:both">
                    <button mat-button type="button" class="cancel"
                            (click)="dialogRef.close('cancel')">取消
                    </button>
                    <button mat-button type="button"
                            class="sure" (click)="update()">确定
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class EditInMinCostSettingDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    beforeUpdate
    disabled = {value: false}
    dateRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m',
    }
    startTimeOptions

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<EditInMinCostSettingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysInMinCostSettingService: SysInMinCostSettingService,
                private sysNumberFunctionSettingService: SysNumberFunctionSettingService,
                private sysAppFunctionSettingService:SysAppFunctionSettingService) {
    }

    ngOnInit() {
        this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
            {defaultDate:new Date(this.data.startMonth)}, {
                onChange: event => {
                    this.data.startMonth = moment(event[0]).format('YYYY-MM')
                }
            })
        if(this.data.updateId==0) {
            this.beforeUpdate = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',低消:' + this.data.minCost + ' 起始月份:' + this.data.startMonth
        }
        else{
            this.beforeUpdate = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',功能费:' + this.data.cost + ' 起始月份:' + this.data.startMonth
        }
    }

    update() {
        this.disabled.value = true
        /*修改呼入低消*/
        if(this.data.updateId == 0) {
            this.data.operationStr = this.beforeUpdate + ',低消:' + this.data.minCost + ' 起始月份:' + this.data.startMonth + ',修改热线号码为:' + this.data.hotline + '的呼入低消'
            this.sysInMinCostSettingService.updateInMinCostSetting(this.data)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.dialogRef.close('success')
                    }
                })
        }
        /*修改号码功能费*/
        if(this.data.updateId == 1) {
            this.data.minCost = this.data.cost
            this.data.operationStr = this.beforeUpdate + ',功能费:' + this.data.cost + ' 起始月份:' + this.data.startMonth + ',修改区号为:' + this.data.areaCode + '号码为:' + this.data.trunk + '的号码功能费'
            this.sysNumberFunctionSettingService.updateNumberFunctionSetting(this.data)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.dialogRef.close('success')
                    }
                })
        }
        /*修改功能费*/
        if(this.data.updateId == 2) {
            this.data.operationStr = this.beforeUpdate + ',功能费:' + this.data.cost + ' 起始月份:' + this.data.startMonth + ',修改功能名称为:' + this.data.name + '的功能费'
            this.sysAppFunctionSettingService.updateAppFunctionSetting(this.data)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.dialogRef.close('success')
                    }
                })
        }
    }
}
