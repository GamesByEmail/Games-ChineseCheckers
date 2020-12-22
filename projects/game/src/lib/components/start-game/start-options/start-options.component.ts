import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IStartTeamConfig, IStartOptions } from '@gamesbyemail/base';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-startoptions',
  templateUrl: './start-options.component.html',
  styleUrls: ['./start-options.component.css']
})
export class StartOptionsComponent implements OnInit {
  @Input('teamConfig') teamConfig!: IStartTeamConfig
  @Input() options!: IStartOptions;
  @Output('change') emitter = new EventEmitter<string>();

  ngOnInit(): void {
    if (this.teamConfig.optionNames)
      for (let i = 0; i < this.teamConfig.optionNames.length; i++)
        if (this.options[this.teamConfig.optionNames[i]] === undefined)
          this.options[this.teamConfig.optionNames[i]] = "";

    this.options.$finalize = (...params: any[]) => {
      return this.finalize(params);
    };
  }
  finalize(params: any[]) {
    delete this.options.$finalize;
    return this.options;
  }
  optionAllowed(optionName: string): boolean {
    return this.teamConfig !== undefined && this.teamConfig.optionNames !== undefined && this.teamConfig.optionNames.indexOf(optionName) >= 0;
  }
}
