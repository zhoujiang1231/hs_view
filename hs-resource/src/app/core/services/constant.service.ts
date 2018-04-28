import {Injectable} from '@angular/core'

@Injectable()
export class ConstantService {
    static HOST = 'http://localhost:8080'
    static vocp_api_vlink = 'http://api.vlink.cn/'
    static navTabs: any[] = [
        {
            title: '教师管理', icon: '', mat_icon: '', link: 'teacher', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '教师列表',
                    link: '/index/teacher',
                    mat_icon: 'featured_play_list',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '学生管理', icon: '', mat_icon: '', link: 'student', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '学生列表',
                    link: '/index/student',
                    mat_icon: 'flip_to_front',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '课程管理', icon: '', mat_icon: '', link: 'course', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '课程列表',
                    link: '/index/course',
                    mat_icon: 'tv',
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
            title: '账户设置', icon: '', mat_icon: '', link: 'account', open: false, show: true,
            children: [
                {name: '修改密码', link: '/index/account/psw', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        }
    ]

    static navTabsTeacher: any[] = [
        {
            title: '课程管理', icon: '', mat_icon: '', link: 'course', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '课程列表',
                    link: '/index/course',
                    mat_icon: 'tv',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
                {
                    name: '课程管理',
                    link: '/index/teacherCourse',
                    mat_icon: 'dashboard',
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
            title: '账户设置', icon: '', mat_icon: '', link: 'account', open: false, show: true,
            children: [
                {name: '修改密码', link: '/index/account/psw', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        }
    ]


    static navTabsStudent = [
        {
            title: '课程管理', icon: '', mat_icon: '', link: 'course', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '课程列表',
                    link: '/index/course',
                    mat_icon: 'tv',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
                {
                    name: '已选课程',
                    link: '/index/selectCourse',
                    mat_icon: 'dashboard',
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
            title: '账户设置', icon: '', mat_icon: '', link: 'account', open: false, show: true,
            children: [
                {name: '个人信息', link: '/index/account/info', mat_icon: 'router', choosed: false, show: true},
                {name: '修改密码', link: '/index/account/psw', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        }
    ]

}

