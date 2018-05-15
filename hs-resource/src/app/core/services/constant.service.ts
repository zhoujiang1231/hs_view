import {Injectable} from '@angular/core'

@Injectable()
export class ConstantService {
    static HOST = 'http://azhou.top:8080'
    static navTabs: any[] = [
        {
            title: '教师管理', icon: '', mat_icon: '', link: 'teacher', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '教师列表',
                    link: '/index/teacher',
                    mat_icon: 'assessment',
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
                    mat_icon: 'layers',
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
    ]

    static navTabsTeacher: any[] = [
        {
            title: '课程管理', icon: '', mat_icon: '', link: 'course', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '课程列表',
                    link: '/index/course',
                    mat_icon: 'map',
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
            title: '成绩管理', icon: '', mat_icon: '', link: 'grade', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '学生成绩',
                    link: '/index/studentGrade',
                    mat_icon: 'map',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
    ]


    static navTabsStudent = [
        {
            title: '课程管理', icon: '', mat_icon: '', link: 'course', open: false, mark: 'check_in', show: true,
            children: [
                {
                    name: '课程列表',
                    link: '/index/course',
                    mat_icon: 'map',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
                {
                    name: '已选课程',
                    link: '/index/selectCourse',
                    mat_icon: 'highlight',
                    choosed: false,
                    mark: 'check_in',
                    show: true
                },
            ]
        },
        {
            title: '成绩管理', icon: '', mat_icon: '', link: 'grade', open: false, show: true,
            children: [
                {name: '我的成绩', link: '/index/myGrade', mat_icon: 'ev_station', choosed: false, show: true},
            ]
        },
        {
            title: '课表管理', icon: '', mat_icon: '', link: 'grade', open: false, show: true,
            children: [
                {name: '我的课表', link: '/index/schedule', mat_icon: 'flip_to_front', choosed: false, show: true},
            ]
        },
        {
            title: '账户设置', icon: '', mat_icon: '', link: 'account', open: false, show: true,
            children: [
                {name: '个人信息', link: '/index/account/info', mat_icon: 'router', choosed: false, show: true},
            ]
        }
    ]
    static cTimeMonthData = [
        {value:'星期一'},
        {value:'星期二'},
        {value:'星期三'},
        {value:'星期四'},
        {value:'星期五'},
        ]

    static cTimeData = [
        {value:'第一大节课'},
        {value:'第二大节课'},
        {value:'第三大节课'},
        {value:'第四大节课'},
    ]

    static departList = [
        {value:'文学院'},
        {value:'政法学院'},
        {value:'外国语学院'},
        {value:'商学院'},
        {value:'美术学院'},
        {value:'音乐学院'},
        {value:'计算机学院'},
        {value:'数理学院'},
        {value:'生命科学学院'},
        {value:'化学化工学院'},
        {value:'体育学院'},
        {value:'新闻与传播学院'},
        {value:'旅游文化与地理科学学院'},
        {value:'机电工程学院'},
        {value:'电子信息学院'},
        {value:'建筑学院'},
        {value:'交通学院'},
        {value:'国际教育学院'},
    ]
}

