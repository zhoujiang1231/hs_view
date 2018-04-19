import {Injectable} from '@angular/core'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class RepBusinessService {

  constructor(private connectionService: ConnectionService) {}

  /**业务日报表查询：get**/
  reloadDayBusiness(params) {
    const path = '/api/service/day/reports'
    return  this.connectionService.get(path, {params: params})
  }

  /**业务月报表查询：get**/
  reloadMonthBusiness(params) {
    const path = '/api/service/month/reports'
    return this.connectionService.get(path, {params: params})
  }
}
