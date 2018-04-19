import {Component} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const themes = ['sea', 'sky', 'theme1', 'theme2', 'theme3']
    // const theme = 'sea';
    // if (~themes.indexOf(theme)) {
    //   // console.log('theme',theme);
    //   require('../../public/themes/' + theme + '.css');
    // } else {
    //   // console.log('theme not');
    //   require('../../public/themes/indigo-pink.css');
    // }
    // require('../../public/themes/indigo-pink.css');

    window.localStorage.setItem('feathers-jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJ1c2VySWQiOiI1OTc3ZWVhMzFhY2EwNzdkMmZlMWIxZmUiLCJpYXQiOjE1MTA2NDM3OTAsImV4cCI6MTUxMDczMDE5MCwiYXVkIjoiaHR0cDovL3lhcm4ucHciLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyJ9.xW2EwuKuODobKOhXcNNK75XsfvJLmjZHugD_l6kBzuc')
  }

  title = 'app'
}
