import {Injectable} from '@angular/core'

@Injectable()
export class ConstantService {
    static HOST = 'http://localhost:8080'
    static vocp_api_vlink = 'http://api.vlink.cn/'
    static navTabs: any[] = [
        {
            title: '教师管理', icon: '', mat_icon: '', link: 'callRecords', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '教师列表',
                    link: '/index/callRecords/cdrIb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '学生管理', icon: '', mat_icon: '', link: 'callRecords', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '学生列表',
                    link: '/index/callRecords/cdrIb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '课程管理', icon: '', mat_icon: '', link: 'callRecords', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '课程列表',
                    link: '/index/callRecords/cdrIb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '账户管理', icon: '', mat_icon: '', link: '', open: false, mark: 'customer', show: true,
            children: [
                {
                    name: '直销部门管理',
                    link: '/index/directDepartmentManage',
                    mat_icon: 'layers',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '直销经理管理',
                    link: '/index/directManagerManage',
                    mat_icon: 'map',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '企业管理',
                    link: '/index/customerManage',
                    mat_icon: 'tv',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {name: '应用管理', link: '/index/vlinkApp', mat_icon: 'dock', choosed: false, mark: 'customer', show: true},
                {
                    name: '消费日志',
                    link: '/index/paylogs',
                    mat_icon: 'dashboard',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '预消费日志',
                    link: '/index/preDeductLog',
                    mat_icon: 'flip_to_front',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '账单统计',
                    link: '/index/billStatistics',
                    mat_icon: 'assessment',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '操作日志',
                    link: '/index/operationLog',
                    mat_icon: 'highlight',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
            ]
        },
        {
            title: '通话详情', icon: '', mat_icon: '', link: 'cdrDetail', open: false, show: true,
            children: [
                {name: '呼入统计', link: '/index/cdrDetail/cdrIb', mat_icon: 'router', choosed: false, show: true},
                {name: '外呼统计', link: '/index/cdrDetail/cdrOb', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        }
    ]

    static navTabsCustomer: any[] = [
        {
            title: '通话记录', icon: '', mat_icon: '', link: 'callRecords', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '呼入记录',
                    link: '/index/callRecords/cdrIb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
                {
                    name: '呼出记录',
                    link: '/index/callRecords/cdrOb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '账户管理', icon: '', mat_icon: '', link: '', open: false, mark: 'customer', show: true,
            children: [
                {
                    name: '消费日志',
                    link: '/index/paylogs',
                    mat_icon: 'dashboard',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
            ]
        }
    ]

    static navTabsDepartment: any[] = [
        {
            title: '账户管理', icon: '', mat_icon: '', link: '', open: false, mark: 'customer', show: true,
            children: [
                {
                    name: '直销经理管理',
                    link: '/index/directManagerManage',
                    mat_icon: 'map',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '消费日志',
                    link: '/index/paylogs',
                    mat_icon: 'dashboard',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '预消费日志',
                    link: '/index/preDeductLog',
                    mat_icon: 'flip_to_front',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '账单统计',
                    link: '/index/billStatistics',
                    mat_icon: 'assessment',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
            ]
        },
        {
            title: '通话详情', icon: '', mat_icon: '', link: 'cdrDetail', open: false, show: true,
            children: [
                {name: '呼入统计', link: '/index/cdrDetail/cdrIb', mat_icon: 'router', choosed: false, show: true},
                {name: '外呼统计', link: '/index/cdrDetail/cdrOb', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        }
    ]

    static navTabsDirectManager: any[] = [
        {
            title: '通话记录', icon: '', mat_icon: '', link: 'callRecords', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '呼入记录',
                    link: '/index/callRecords/cdrIb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
                {
                    name: '呼出记录',
                    link: '/index/callRecords/cdrOb',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '账户管理', icon: '', mat_icon: '', link: '', open: false, mark: 'customer', show: true,
            children: [
                {
                    name: '企业管理',
                    link: '/index/customerManage',
                    mat_icon: 'tv',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {name: '应用管理', link: '/index/vlinkApp', mat_icon: 'dock', choosed: false, mark: 'customer', show: true},
                {
                    name: '消费日志',
                    link: '/index/paylogs',
                    mat_icon: 'dashboard',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '预消费日志',
                    link: '/index/preDeductLog',
                    mat_icon: 'flip_to_front',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
                {
                    name: '账单统计',
                    link: '/index/billStatistics',
                    mat_icon: 'assessment',
                    choosed: false,
                    mark: 'customer',
                    show: true
                },
            ]
        },
        {
            title: '通话详情', icon: '', mat_icon: '', link: 'cdrDetail', open: false, show: true,
            children: [
                {name: '呼入统计', link: '/index/cdrDetail/cdrIb', mat_icon: 'router', choosed: false, show: true},
                {name: '外呼统计', link: '/index/cdrDetail/cdrOb', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        }
    ]

    /*constructor(private connectionService: ConnectionService) {
        this.getIp()
    }
    /!*获取服务器ip*!/
    getIp() {
        this.connectionService.get('http://169.254.169.254/latest/meta-data/public-ipv4')
            .then(res => {
                ConstantService.HOST = 'http://'+res.data+':8089'
            })
    }*/

}

