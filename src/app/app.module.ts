import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TestModule } from '@gamesbyemail/base';

import { StartGameModule, JoinGameModule, RulesModule, PlayModule } from '../../projects/game/src/public-api';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StartGameModule,
    JoinGameModule,
    RulesModule,
    PlayModule,
    TestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry) {
    matIconRegistry.addSvgIcon("warning", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/alert/baseline-warning-24px.svg"));
    matIconRegistry.addSvgIcon("info", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/action/baseline-info-24px.svg"));
    matIconRegistry.addSvgIcon("flag", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/content/baseline-flag-24px.svg"));
    matIconRegistry.addSvgIcon("outlined_flag", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/content/baseline-outlined_flag-24px.svg"));
    matIconRegistry.addSvgIcon("ok", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/action/baseline-check_circle-24px.svg"));
    matIconRegistry.addSvgIcon("cancel", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/navigation/baseline-cancel-24px.svg"));
    matIconRegistry.addSvgIcon("menu", domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/navigation/baseline-menu-24px.svg"));
  }
 }
