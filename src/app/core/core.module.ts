import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { httpAuthInterceptor } from './interceptors';
import { RouterModule } from '@angular/router';
import * as fr from '@angular/common/locales/fr-CI';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, HttpClientModule], // Nécessaire pour la navigation, pas besoins de forRoute pour la définition des routes
  exports: [HeaderComponent], // Permet d'avoir accès au component dans app module
  providers: [httpAuthInterceptor, { provide: LOCALE_ID, useValue: 'fr-CI' }],
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
