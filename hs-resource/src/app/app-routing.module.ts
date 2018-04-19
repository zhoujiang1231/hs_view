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
import {BusinessListComponent} from './business/business-list.component'
import {BusinessRouterComponent} from './business/business-router.component'
import {SystemDemoComponent} from './system/demo/system-demo.component'
import {SystemProductComponent} from './system/product/system-product.component'
import {SystemPlatformComponent} from './system/platform/system-platform.component'
import {SystemParameterComponent} from './system/parameter/system-parameter.component'
import {SystemUserComponent} from './system/user/system-user.component'
import {SystemRoleComponent} from './system/role/system-role.component'
import {SystemModuleComponent} from './system/module/system-module.component'
import {SystemAclComponent} from './system/acl/system-acl.component'
import {SystemRealTimeComponent} from './system/real-time/system-real-time.component'
import {SystemAlertInfoComponent} from './system/alert-info/system-alert-info.component'
import {RealTimeListsComponent} from './system/real-time/real-time-lists.component'
import {RealTimeListComponent} from './system/real-time/real-time-list.component'
import {DockNetComponent} from './dock/dock-net.component'
import {DockNetListComponent} from './dock/dock-net-list.component'
import {PhoneNoteComponent} from './phone/phone-note.component'
import {DailyRouterComponent} from './daily/daily-router/daily-router.component'
import {DailyOperateComponent} from './daily/daily-operate/daily-operate.component'
import {HomeComponent} from './core/home/home.component'
import {BusStatementComponent} from './report/business/bus-statement.component'
import {BusDayStatementComponent} from './report/business/day-statement.component'
import {BusMonthStatementComponent} from './report/business/month-statement.component'
import {ComStatementComponent} from './report/company/com-statement.component'
import {ComDayStatementComponent} from './report/company/en-day-statement.component'
import {ComMonthStatementComponent} from './report/company/en-month-statement.component'
import {LoginComponent} from './clientauth/login/login.component'
import {RealTimeSearchComponent} from './system/real-time/real-time-search.component'
import {NumbersComponent} from './numbers/numbers.component'
import {CallComponent} from './call/call.component'


const routes: Routes = [
  // {path: '', redirectTo: '/index/home', pathMatch: 'full'},
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {
    path: 'index', component: IndexComponent,
    canActivate: [AuthGuard],
    resolve: {author: AuthorResolver},
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'daily', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'log', pathMatch: 'full'},
          {path: 'log', component: DailyOperateComponent},
          {path: 'route', component: DailyRouterComponent}
        ]
      },
      // {path: 'alert', component: RouterComponent,
      //   children: [
      //     {path: '', redirectTo: 'info', pathMatch: 'full'},
      //     {path: 'info', component: AlertInfoComponent}
      //   ]
      //  },
      {path: 'business', component: RouterComponent,
       children: [
         {path: '', redirectTo: 'list', pathMatch: 'full'},
         {path: 'list', component: BusinessListComponent},
         {path: 'router', component: BusinessRouterComponent}
       ]
      },
      {path: 'system', component: RouterComponent,
       children: [
         {path: '', redirectTo: 'demo', pathMatch: 'full'},
         {path: 'demo', component: SystemDemoComponent},
         {path: 'product', component: SystemProductComponent},
         {path: 'platform', component: SystemPlatformComponent},
         {path: 'parameter', component: SystemParameterComponent},
         {path: 'user', component: SystemUserComponent},
         {path: 'role', component: SystemRoleComponent},
         {path: 'module', component: SystemModuleComponent},
         {path: 'acl', component: SystemAclComponent},
         {path: 'manage', component: SystemRealTimeComponent,
           children: [
             {path: '', redirectTo: 'groups', pathMatch: 'full'},
             {path: 'groups', component : RealTimeListsComponent},
             {path: 'list', component : RealTimeListComponent},
             // {path: 'search', component : RealTimeSearchComponent},
           ]
         },
         {path: 'alertInfo', component: SystemAlertInfoComponent}
       ]
      },
      {path: 'dock', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'netList', pathMatch: 'full'},
          {path: 'netList', component: DockNetListComponent},
          {path: 'net', component: DockNetComponent}
        ]
      },
      // {path: 'tool', component: RouterComponent,
      //  children: [
      //    {path: '', redirectTo: 'analyse', pathMatch: 'full'},
      //    {path: 'analyse', component: RouteAnalyseComponent}
      //  ]
      // },
      {path: 'tel', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'bill', pathMatch: 'full'},
          {path: 'bill', component: PhoneNoteComponent}
        ]
      },
      {path: 'report', component: RouterComponent,
       children: [
         {path: '', redirectTo: 'tel_bill', pathMatch: 'full'},
         {path: 'bus', component: BusStatementComponent,
          children: [
            {path: '', redirectTo: 'day', pathMatch: 'full'},
            {path: 'day', component: BusDayStatementComponent},
            {path: 'month', component: BusMonthStatementComponent},
          ]
         },
         {path: 'enter', component: ComStatementComponent,
           children: [
             {path: '', redirectTo: 'day', pathMatch: 'full'},
             {path: 'day', component: ComDayStatementComponent},
             {path: 'month', component: ComMonthStatementComponent},
           ]
         },
       ]
      },
      {path: 'numbers', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'search', pathMatch: 'full'},
          {path: 'search', component: NumbersComponent}
        ]
      },
      {path: 'call', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'test', pathMatch: 'full'},
          {path: 'test', component: CallComponent}
        ]
      },
      {path: 'real_time', component: RouterComponent,
        children: [
          {path: '', redirectTo: 'search', pathMatch: 'full'},
          {path: 'search', component: RealTimeSearchComponent}
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
