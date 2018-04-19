import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {LocalStorage} from '../services/localstorage.service'
import {DataService} from '../services/data.service'

@Component({
  selector: 'app-no-access',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  appName: any = LocalStorage.get('appName')

  constructor(private router: Router,
              private dataService: DataService) {
    // this.author =  LocalStorage.get('permessions') || this.dataService.permission;

  }

  ngOnInit() {

  }
}
