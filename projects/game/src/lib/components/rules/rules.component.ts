import { Component, Input } from '@angular/core';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {

  team:'White'|'Black'='White';
  @Input('team') set _team(value:string){
    this.team=value && value.toLowerCase()==='black' ? 'Black' : 'White';
  };
}
