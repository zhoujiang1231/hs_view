import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {AppRoutingModule} from '../app-routing.module'
import { TypeaheadModule } from 'ngx-bootstrap';
import {CustomizeMaterialModule} from '../module/customize-material.module'
import {SysUserService} from "./user/sys-user.service";
import {SystemStudentListComponent} from "./studentList/system-studentList.component";
import {SysStudentListDialogComponent} from "./studentList/sys-student.dialog";
import {SysStudentListService} from "./studentList/sys-studentList.service";
import {SysTeacherListDialogComponent} from "./teacherList/sys-teacher.dialog";
import {SysTeacherListService} from "./teacherList/sys-teacherList.service";
import {SystemTeacherListComponent} from "./teacherList/system-teacherList.component";
import {SysCourseListDialogComponent} from "./courseList/sys-course.dialog";
import {SysCourseListService} from "./courseList/sys-courseList.service";
import {SystemCourseListComponent} from "./courseList/system-courseList.component";
import {SystemSelectCourseComponent} from "./courseList/system-selectCourse.component";
import {SystemTeacherCourseListComponent} from "./teacherCourseList/system-teacherCourseList.component";
import {SysTeacherCourseDialogComponent} from "./teacherCourseList/sys-teacherCourse.dialog";
import {SysTeacherCourseListService} from "./teacherCourseList/sys-teacherCourseList.service";
import {SysMyGradeService} from "./myGrade/sys-myGrade.service";
import {SystemMyGradeComponent} from "./myGrade/system-myGrade.component";
import {SysGradeListDialogComponent} from "./gradeList/sys-gradeList.dialog";
import {SysGradeListService} from "./gradeList/sys-gradeList.service";
import {SystemGradeListComponent} from "./gradeList/system-gradeList.component";
import {SystemScheduleComponent} from "./schedule/system-schedule.component";
import {SysScheduleService} from "./schedule/sys-schedule.service";
import {ModifyPasswordDialogComponent} from "./modifyPassword/modifyPassword.dialog";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule,
    SharedModule,
    CustomizeMaterialModule,
    AppRoutingModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    SysStudentListDialogComponent,
    SysTeacherListDialogComponent,
    SystemTeacherListComponent,
    SysCourseListDialogComponent,
    SystemCourseListComponent,
    SystemSelectCourseComponent,
    SysTeacherCourseDialogComponent,
    SystemTeacherCourseListComponent,
    SystemMyGradeComponent,
    SysGradeListDialogComponent,
    SystemGradeListComponent,
    SystemScheduleComponent,
    SystemStudentListComponent,
    ModifyPasswordDialogComponent,
  ],
  entryComponents: [
    SysStudentListDialogComponent,
    SysTeacherListDialogComponent,
    SysCourseListDialogComponent,
    SysTeacherCourseDialogComponent,
    SysGradeListDialogComponent,
    ModifyPasswordDialogComponent,
  ],
  exports: [],
  providers: [
    SysUserService,
    SysTeacherListService,
    SysCourseListService,
    SysTeacherCourseListService,
    SysMyGradeService,
    SysGradeListService,
    SysScheduleService,
    SysStudentListService,
  ]
})

export class SystemModule {
}
