/**
 * Created by kosei on 2017/11/6.
 */
import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-empty-data',
  template: `
    <div id="empty-data" [ngClass]="{position: position === true}">
      <dl>
        <dt>
          <mat-icon>filter_none</mat-icon>
        </dt>
        <dd>很抱歉，您没有访问权限！</dd>
      </dl>
    </div>
  `,
  styles: [`
    dl{
      text-align: center;
      padding: 10rem 0;
      margin: 0;
      color: #999;
    }
    dd{
      margin-bottom: 0;
    }
    .position{
      position: absolute;
      top: 0;
      left: calc(50% - 84px);
    }
  `],
})

export class EmptyPermissionComponent {
  @Input() position?: boolean
}
