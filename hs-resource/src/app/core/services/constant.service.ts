import {Injectable} from '@angular/core'

@Injectable()
export class ConstantService {
  // static HOST = ''
  static HOST = 'http://sip-router-api-test.cticloud.cn' // ****上传到线上时注释
  // static HOST = 'http://54.222.146.168:8089'
  // static HOST = 'http://sip-router-2.cticloud.cn:8089'
  static navTabs: any[] = [
    {
      title: '日志', icon: '', mat_icon: '', link: 'daily', open: false, mark: 'check_in', show: true,
      children: [
        {name: '操作日志列表', link: '/index/daily/log', mat_icon: 'featured_play_list', choosed: false, mark: 'check_in', show: true},
        {name: '操作路由日志', link: '/index/daily/route', mat_icon: 'router', choosed: false, mark: 'check_in', show: true}
      ]
    },
    // {
    //   title: '告警信息', icon: '', mat_icon: '', link: 'alert', open: false, mark: 'techplus:systemSetting', show: true,
    //   children: [
    //     {name: '告警信息', link: '/index/alert/info', mat_icon: 'notifications', choosed: false, mark: 'board', show: true},
    //   ]
    // },
    {
      title: '业务管理', icon: '', mat_icon: '', link: 'business', open: false, mark: 'check_in', show: true,
      children: [
        {name: '业务列表', link: '/index/business/list', mat_icon: 'featured_play_list', choosed: false, mark: 'check_in', show: true},
        {name: '业务路由', link: '/index/business/router', mat_icon: 'router', choosed: false, mark: 'check_in', show: true}
      ]
    },
    {
      title: '系统设置', icon: '', mat_icon: '', link: 'system', open: false, mark: 'customer', show: true,
      children: [
        {name: '实例管理', link: '/index/system/demo', mat_icon: 'layers', choosed: false, mark: 'customer', show: true},
        {name: '产品管理', link: '/index/system/product', mat_icon: 'map', choosed: false, mark: 'customer', show: true},
        {name: '平台管理', link: '/index/system/platform', mat_icon: 'tv', choosed: false, mark: 'customer', show: true},
        {name: '参数设置', link: '/index/system/parameter', mat_icon: 'dock', choosed: false, mark: 'customer', show: true},
        {name: '用户管理', link: '/index/system/user', mat_icon: 'person_outline', choosed: false, mark: 'customer', show: true},
        {name: '角色管理', link: '/index/system/role', mat_icon: 'face', choosed: false, mark: 'customer', show: true},
        {name: '模块管理', link: '/index/system/module', mat_icon: 'dashboard', choosed: false, mark: 'customer', show: true},
        {name: 'ACL管理', link: '/index/system/acl', mat_icon: 'flip_to_front', choosed: false, mark: 'customer', show: true},
        {name: '实时统计管理', link: '/index/system/manage', mat_icon: 'assessment', choosed: false, mark: 'customer', show: true,
          children: [
            {name: '实时统计组管理', link: '/index/system/manage/groups', mat_icon: '', choosed: false, mark: 'customer', show: true},
            {name: '实时统计管理', link: '/index/system/manage/list', mat_icon: '', choosed: false, mark: 'customer', show: true}
          ]
        },
        {name: '告警管理', link: '/index/system/alertInfo', mat_icon: 'highlight', choosed: false, mark: 'customer', show: true},
      ]
    },
    {
      title: '对接设置', icon: '', mat_icon: '', link: 'dock', open: false, show: true,
      children: [
        {name: '对接中继组', link: '/index/dock/netList', mat_icon: 'router', choosed: false, show: true},
        {name: '对接网关', link: '/index/dock/net', mat_icon: 'ev_station', choosed: false, show: true},
      ]
    },
    {
      title: '通话记录', icon: '', mat_icon: '', link: 'tel', open: false, mark: 'personal_trainer', show: true,
      children: [
        {name: '话单查询', link: '/index/tel/bill', mat_icon: 'search', choosed: false, show: true},
      ]
    },
    {
      title: '报表', icon: '', mat_icon: '', link: 'report', open: false, show: true,
      children: [
        {name: '业务报表', link: '/index/report/bus', mat_icon: 'insert_chart', choosed: false, show: true,
         children: [
           {name: '业务日报', link: '/index/report/bus/day', mat_icon: 'insert_chart', choosed: false, show: true},
           {name: '业务月报', link: '/index/report/bus/month', mat_icon: 'insert_chart', choosed: false, show: true},
         ]
        },
        {name: '网关报表', link: '/index/report/enter', mat_icon: 'insert_chart', choosed: false, show: true,
         children: [
           {name: '网关日报', link: '/index/report/enter/day', mat_icon: 'insert_chart', choosed: false, show: true},
           {name: '网关月报', link: '/index/report/enter/month', mat_icon: 'insert_chart', choosed: false, show: true},
         ]
        },
      ]
    },
    {
      title: '号码管理', icon: '', mat_icon: '', link: 'numbers', open: false, mark: 'personal_trainer', show: true,
      children: [
        {name: '号码查询', link: '/index/numbers/search', mat_icon: 'search', choosed: false, show: true},
      ]
    },
    {
      title: '路由分析', icon: '', mat_icon: '', link: 'call', open: false, mark: 'personal_trainer', show: true,
      children: [
        {name: '呼叫测试', link: '/index/call/test', mat_icon: 'phonelink_ring', choosed: false, show: true},
      ]
    },
    {
      title: '实时统计', icon: '', mat_icon: '', link: 'real_time', open: false, mark: 'personal_trainer', show: true,
      children: [
        {name: '实时统计查询', link: '/index/real_time/search', mat_icon: 'search', choosed: false, show: true},
      ]
    },
  ]

  // 路由actionTypes
  static actionTypes: any[] = [
    {name: 'noop', value: 1}, {name: 'set_var', value: 2}, {name: 'add_prefix', value: 3},
    {name: 'remove_prefix', value: 4}, {name: 'remove_codec', value: 5}, {name: 'add_header', value: 6},
    {name: 'remove_header', value: 7}, {name: 'set_next_route', value: 8}, {name: 'set_clid', value: 9},
    {name: 'set_dlg', value: 10}, {name: 'set_cdr_tag', value: 11}, {name: 'set_to_tel', value: 12}
  ]
  // 路由nameType\valueType
  static typesArr: any [] = [
    {name: '字符串', value: 1}, {name: '固定变量', value: 2},
    {name: 'avp变量 ', value: 3}, {name: 'hdr变量', value: 4},
    {name: '被叫号码av变量 ', value: 5}, {name: '主叫号码av变量', value: 6}
  ]
}

