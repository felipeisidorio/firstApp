import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRussiaProvider } from '../../providers/api-russia/api-russia';

@IonicPage()
@Component({
  selector: 'page-grupos',
  templateUrl: 'grupos.html',
  providers: [
    ApiRussiaProvider
  ]
})
export class GruposPage {
  public source = '';
  public grupos: Array<any> = new Array<any>();
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private apiRussiaProvider: ApiRussiaProvider) {
     
  }
  ionViewDidLoad() {
    this.load_data();
  }
  doRefresh(refresher) {
    this.load_data();
    refresher.complete();
  }
  load_data() {
    this.grupos = new Array<any>();
    this.apiRussiaProvider.getDados(this.source).subscribe(
      data => {
        for (const key1 in data['groups']) {
          if (data['groups'].hasOwnProperty(key1)) {
            let vGrupo: Array<any> = new Array<any>();
            for (let key2 = 0; key2 < data['groups'][key1]['teams'].length; key2++) {
              let vSelecao = {
                posicao: key2 + 1,
                jogos: data['teams'][data['groups'][key1]['teams'][key2] - 1].jogos,
                pontos: data['teams'][data['groups'][key1]['teams'][key2] - 1].pontos,
                saldoGols: data['teams'][data['groups'][key1]['teams'][key2] - 1].saldoGols,
                nome: data['teams'][data['groups'][key1]['teams'][key2] - 1].name
              }
              vGrupo.push(vSelecao);
            }
            this.grupos.push({
              name: data['groups'][key1].name,
              selecoes: vGrupo
            });
          }
        }
      }, error => {
        this.source = 'LOCAL';
        this.load_data();
        console.log(error);
      }
    );
  }
  condition(pos : number) : boolean{
    if(pos == 1 || pos == 2 ){
      return true;
    }
    return false;
  }
  openTela(msg: string) {
    if (msg.search("_") < 0) {
      this.navCtrl.push('SelecoesPage', { msg });
    }
  }
}
