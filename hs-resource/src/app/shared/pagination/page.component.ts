import {Component, EventEmitter, Input, Output} from '@angular/core'
import appUtil from '../../utils/pro-util'

@Component({
  selector: 'app-page',
  template: `
    <div class="bottom-page">
      <pagination
        [boundaryLinks]="true"
        [directionLinks]="true"
        [totalItems]="pageObj.totalItems || 999"
        [(ngModel)]="currentPage"
        [rotate]="true"
        [itemsPerPage]="pageObj.limit || 10"
        [maxSize]="5"
        (pageChanged)="changePage($event)"
        (numPages)="numPages = $event"
        previousText="&lsaquo;"
        nextText="&rsaquo;"
        firstText="&laquo;"
        lastText="&raquo;">
      </pagination>
      <div class="total-page">
        共有{{pageObj.totalItems}}条数据
      </div>
      <div class="right-page">
        <input class="go-page" [(ngModel)]="goPage"
               (keypress)="checkNumber($event, goPage)"
               (keyup)="checkNumberValue(goPage)"/>
        <button mat-button class="go-button" (click)="goToPage()">GO</button>
        <div class="total-page" style="display: inline-block;">
          每页显示
          <button class="pageLimit" mat-raised-button [matMenuTriggerFor]="menu" aria-label="Open basic menu">
            {{limit}}
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item *ngFor="let skip of [10, 20, 50, 100]"
                    [disabled]="skip == limit" (click)="changeLimit(skip)">
              {{skip}}
            </button>
          </mat-menu>条
        </div>
      </div>
    </div>
  `,
})

export class PageComponent {
  @Input() pageObj // 分页对象
  @Input() currentPage ? = 1 // 初始的当前页数
  @Output() pageChange = new EventEmitter()
  @Output() limitChange = new EventEmitter()
  goPage
  checkNumber: (event: any, value: any) => any
  limit = 20
  numPages = 0
  cg: any = false
  constructor() {
    this.checkNumber = appUtil.checkNumberKeyCode
  }

  checkNumberValue(inputValue) {
    if (!inputValue || isNaN(inputValue)) {
      inputValue = ''
    }
  }

  /**在分页插件中直接切换当前页**/
  changePage(event) {
    this.pageChange.emit(event.page)
  }

  goToPage() {
    if (!this.goPage) {
      return
    }
    this.currentPage = +this.goPage
  }

  changeLimit(skip) {
    this.cg = !this.cg
    console.log(skip, 'pp')
    this.currentPage = 1
    this.goPage = null
    this.limit = skip
    this.pageObj.limit = skip
    this.limitChange.emit(skip)
  }
}
