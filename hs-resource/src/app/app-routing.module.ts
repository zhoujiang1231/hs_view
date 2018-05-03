/**
 * Created by wangruixia on 2017/7/26.
 */
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {IndexComponent} from './core/index.component'
import {AuthGuard} from './core/services/auth-guard.service'
import {PageNotFoundComponent} from './core/page-not-found.component'
import {AuthorResolver} from './resolver/author.resolver'
import {RouterComponent} from './core/router.component'
import {HomeComponent} from './core/home/home.component'
import {LoginComponent} from './clientauth/login/login.component'
import {SystemStudentListComponent} from "./system/studentList/system-studentList.component";
import {SystemTeacherListComponent} from "./system/teacherList/system-teacherList.component";
import {SystemCourseListComponent} from "./system/courseList/system-courseList.component";
import {SystemAccountInfoComponent} from "./system/account/info/system-accountInfo.component";
import {SystemAccountPswComponent} from "./system/account/psw/system-accountPsw.component";
import {SystemSelectCourseComponent} from "./system/courseList/system-selectCourse.component";
import {SystemTeacherCourseListComponent} from "./system/teacherCourseList/system-teacherCourseList.component";
import {SystemMyGradeComponent} from "./system/myGrade/system-myGrade.component";
import {SystemGradeListComponent} from "./system/gradeList/system-gradeList.component";
import {SystemScheduleComponent} from "./system/schedule/system-schedule.component";

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {
    path: 'index', component: IndexComponent,
    canActivate: [AuthGuard],
    resolve: {author: AuthorResolver},
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: '', component: RouterComponent,
          children: [
              {path: '', redirectTo: 'teacher', pathMatch: 'full'},
              {path: 'teacher', component: SystemTeacherListComponent},
          ]
      },
      {path: '', component: RouterComponent,
          children: [
              {path: '', redirectTo: 'student', pathMatch: 'full'},
              {path: 'student', component: SystemStudentListComponent},
          ]
      },
        {path: '', component: RouterComponent,
            children: [
                {path: '', redirectTo: 'course', pathMatch: 'full'},
                {path: 'course', component: SystemCourseListComponent},
                {path: 'selectCourse', component: SystemSelectCourseComponent},
                {path: 'teacherCourse', component: SystemTeacherCourseListComponent},
            ]
        },
        {path: '', component: RouterComponent,
            children: [
                {path: '', redirectTo: 'myGrade', pathMatch: 'full'},
                {path: 'myGrade', component: SystemMyGradeComponent},
            ]
        },
        {path: '', component: RouterComponent,
            children: [
                {path: '', redirectTo: 'studentGrade', pathMatch: 'full'},
                {path: 'studentGrade', component: SystemGradeListComponent},
            ]
        },
        {path: '', component: RouterComponent,
            children: [
                {path: '', redirectTo: 'schedule', pathMatch: 'full'},
                {path: 'schedule', component: SystemScheduleComponent},
            ]
        },
        {path: 'account', component: RouterComponent,
            children: [
                {path: '', redirectTo: 'info', pathMatch: 'full'},
                {path: 'info', component: SystemAccountInfoComponent},
                {path: 'psw', component: SystemAccountPswComponent}
            ]
        },
    ]
  },
  {
    path: 'signin', component: LoginComponent
  },
  {path: '**', component: PageNotFoundComponent},
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthorResolver
  ]
})

export class AppRoutingModule {
}
