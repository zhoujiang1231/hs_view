import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {LocalStorage} from '../services/localstorage.service'
import {DataService} from '../services/data.service'
import {MatDialog} from "@angular/material";
import {ConnectionService} from "../services/connection.service";

@Component({
    selector: 'app-no-access',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    user
    isPermission
    isCustomer
    vlinkAppData: any[] = []
    constructor(public _dialog: MatDialog,
                private router: Router,
                private dataService: DataService,
                private connectionService: ConnectionService) {

    }

    ngOnInit() {
        this.user = LocalStorage.get('user')
        if(this.user) {
            if (this.user.userType == 11) {
                this.isPermission = 1
            }
            if (this.user.userType == 3) {
                this.isCustomer = 1
            }
        }
        else{
            this.connectionService.logout()
        }
    }

}
