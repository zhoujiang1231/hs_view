import {Injectable} from '@angular/core'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class RepCompanyService {

  constructor(private connectionService: ConnectionService) {}

  /**网关日报表查询：get**/
  reloadDayCompany(params) {
    const path = '/api/gateway/day/reports'
    return this.connectionService.get(path, {params: params})
  }

  /**网关月报表查询：get**/
  reloadMonthCompany(params) {
    const path = '/api/gateway/month/reports'
    return this.connectionService.get(path, {params: params})
  }
}
