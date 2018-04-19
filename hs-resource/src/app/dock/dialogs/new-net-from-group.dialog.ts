import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {DockGroupService} from '../dock-group.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-new-net-from-group',
  template: `
    <div class="redefine-dialog">
      <form [formGroup]="targetForm" (ngSubmit)="add(data)">
        <h1 class="dialog-head">中继组{{data.id ? '编辑' : '新增'}}网关</h1>
        <mat-form-field class="w-100">
          <input matInput [value]="data.trunkGroupId"
                 placeholder="中继组Id" disabled>
        </mat-form-field>
        <mat-form-field class="w-100">
          <mat-select name="gatewayId" [formControl]="targetForm.controls['gatewayId']"
                      [(ngModel)]="data.gatewayId" placeholder="网关名称" required>
            <mat-option *ngFor="let item of data?.gatewayIdArr" [value]="item.id">
              {{item.name}}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="targetForm.controls['gatewayId'].touched && targetForm.controls['gatewayId'].hasError('required')">
            字段不能为空！
          </mat-error>
        </mat-form-field>
        <mat-form-field class="w-100">
          <input matInput type="text"
                 name="weight" [formControl]="targetForm.controls['weight']"
                 [(ngModel)]="data.weight"
                 placeholder="权重" required>
          <mat-error
            *ngIf="targetForm.controls['weight'].touched && targetForm.controls['weight'].hasError('required')">
            字段不能为空！
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
export class NewNetFromGroupDialogComponent {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  disabled = {value: false}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewNetFromGroupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dockGroupService: DockGroupService) {
    this.targetForm = fb.group({
      trunkGroupId: [''],
      weight: ['', Validators.compose([Validators.required, aliValidators.number])],
      gatewayId: [{value: '', disabled: this.data.id}, Validators.compose([Validators.required, aliValidators.number])]
    })
    this.data.gatewayId = this.data.id
  }

  add(data) {
    this.disabled.value = true
    const _data = {
      trunkGroupId: Number(data.trunkGroupId),
      gatewayId: data.gatewayId,
      weight: Number(data.weight)
    }
    if (this.data.id) {
      this.dockGroupService.editNetFromDockGroup(_data)
        .then(res => {
          if (res.data.status === 0) {
            this.dialogRef.close('success')
            appAlert.common.actionSuccess('中继组编辑网关')
          } else {
            this.disabled.value = false
            appAlert.common.actionFailed(res.data.msg || '中继组编辑网关')
          }
        })
        .catch(err => {
          this.disabled.value = false
          appAlert.common.actionFailed('中继组编辑网关')
        })
    } else {
      this.dockGroupService.addNetFromDockGroup(_data)
        .then(page => {
          if (page.data.status === 0) {
            this.dialogRef.close('success')
            appAlert.common.actionSuccess('中继组新增网关')
          } else {
            this.disabled.value = false
            appAlert.common.actionFailed(page.data.msg || '中继组新增网关')
          }
        })
        .catch(err => {
          this.disabled.value = false
          appAlert.common.actionFailed('中继组新增网关')
        })
    }
  }
}
