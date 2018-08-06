import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecoesPage } from './selecoes';

@NgModule({
  declarations: [
    SelecoesPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecoesPage),
  ]
})
export class SelecoesPageModule {}
