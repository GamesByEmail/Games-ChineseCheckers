import { Component, TemplateRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Deferred } from '@packageforge/deferred';

import { ITemplateLibrary, ITemplateSize, TemplateLibraryService } from '@packageforge/template-projection';

import { IPieceKey } from '../../../game/i-piece-key';

@Component({
  selector: '[gamesbyemail-games-chinesecheckers-default-piecelibrary]',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements ITemplateLibrary, AfterViewInit {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;
  constructor(private templateLibraryService: TemplateLibraryService) {
  }
  private initDefer = new Deferred();
  ngAfterViewInit(): void {
    this.initDefer.resolve();
  }
  getTemplate(key: IPieceKey): Promise<TemplateRef<any> | undefined> {
    return this.initDefer.promise.then(() => {
      const id = "Marble" + (key && key.log ? 'Log' : '');
      return this.templateLibraryService.findTemplateById(this.templateRefs, id);
    });
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }
}
