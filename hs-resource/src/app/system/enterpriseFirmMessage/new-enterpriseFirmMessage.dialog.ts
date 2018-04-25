import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysEnterpriseFirmMessageService} from './sys-enterpriseFirmMessage.service'
import {LocalStorage} from "../../core/services/localstorage.service";

@Component({
    selector: 'app-new-enterpriseFirmMessage',
    template: `
        <app-page-header [title]="'企业当前月低消详情'"
                         [rightButtons]="[{ title: '返回', action: 'add'}]"
                         (tapRightBtn)="dialogRef.close('cancel')"></app-page-header>
        <div class="redefine-dialog">
            <div>
                <h1>呼入低消</h1>
                <ngx-datatable class="material striped"
                               [rows]="allMinCosts.inMinCost"
                               [headerHeight]="40"
                               [rowHeight]="40"
                               [columnMode]="'force'"
                               [scrollbarH]="true">
                    <ngx-datatable-column [name]="'资费ID'" [prop]="'id'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'热线号码'" [prop]="'hotline'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'低消'" [prop]="'minCost'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'开始月份'">
                        <ng-template let-row="row" let-rowIndex="rowIndex" let-value="value" ngx-datatable-cell-template>
                            {{row?.startMonth | dateFormat:'YYYY-MM'}}
                        </ng-template>
                    </ngx-datatable-column>
                </ngx-datatable>
                <h1>号码功能费</h1>
                <ngx-datatable class="material striped"
                               [rows]="allMinCosts.numberFunction"
                               [headerHeight]="40"
                               [rowHeight]="40"
                               [columnMode]="'force'"
                               [scrollbarH]="true">
                    <ngx-datatable-column [name]="'资费ID'" [prop]="'id'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'区号'" [prop]="'areaCode'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'号码'" [prop]="'trunk'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'功能费'" [prop]="'cost'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'开始月份'">
                        <ng-template let-row="row" let-rowIndex="rowIndex" let-value="value" ngx-datatable-cell-template>
                            {{row?.startMonth | dateFormat:'YYYY-MM'}}
                        </ng-template>
                    </ngx-datatable-column>
                </ngx-datatable>
                <h1>功能费</h1>
                <ngx-datatable class="material striped"
                               [rows]="allMinCosts.appFunction"
                               [headerHeight]="40"
                               [rowHeight]="40"
                               [columnMode]="'force'"
                               [scrollbarH]="true">
                    <ngx-datatable-column [name]="'资费ID'" [prop]="'id'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'功能名称'" [prop]="'name'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'功能费'" [prop]="'cost'"></ngx-datatable-column>
                    <ngx-datatable-column [name]="'开始月份'">
                        <ng-template let-row="row" let-rowIndex="rowIndex" let-value="value" ngx-datatable-cell-template>
                            {{row?.startMonth | dateFormat:'YYYY-MM'}}
                        </ng-template>
                    </ngx-datatable-column>
                </ngx-datatable>
            </div>
        </div>
    `,
})
export class NewEnterpriseFirmMessageDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    isEdit// 判断是处于什么状态：编辑 、新建
    disabled = {value: false}
    allMinCosts : any = {}

    constructor(
                public dialogRef: MatDialogRef<NewEnterpriseFirmMessageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysEnterpriseFirmMessageService: SysEnterpriseFirmMessageService) {
        this.allMinCosts = this.sysEnterpriseFirmMessageService.allMinCosts
    }

    ngOnInit() {
        if (this.data.id) {// 编辑状态
            this.isEdit = true
        } else {// 新建状态
            this.isEdit = false
        }
        if(LocalStorage.get('accountId')) {
            this.sysEnterpriseFirmMessageService.getAllMinCosts({accountId: LocalStorage.get('accountId')})
                .subscribe(page =>{
                    if(page.data.result == 0){
                        this.allMinCosts = {...page.data.data}
                    }
                })

        }
    }
}
