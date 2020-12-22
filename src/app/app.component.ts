import { Component } from '@angular/core';
import { IMe, testMes } from '@gamesbyemail/base';
import { testData } from './test-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  me:IMe=testMes.basic;
  game=testData.jumpMultiplier;
}
