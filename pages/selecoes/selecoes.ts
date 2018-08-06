import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRussiaProvider } from '../../providers/api-russia/api-russia';

@IonicPage()
@Component({
  selector: 'page-selecoes',
  templateUrl: 'selecoes.html',
  providers: [
    ApiRussiaProvider
  ]
})
export class SelecoesPage {
  public source = '';
  public selecoes: Array<any> = new Array<any>();
  public convocados: Array<any> = new Array<any>()
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private selecoesPrivider: ApiRussiaProvider
  ) { }

  ionViewDidLoad() {
    this.load_data();
  }
  load_data() {
    this.selecoesPrivider.getDados(this.source).subscribe(
      data => {
        for (const key in data['teams']) {
          if (data['teams'].hasOwnProperty(key)
            && data['teams'][key].name == this.navParams.get('msg')) {
            this.selecoes.push(data['teams'][key]);
          }
        }
        for (const key in data['convocados']) {
          if (data['convocados'].hasOwnProperty(key)
            && data['convocados'][key].Team == this.navParams.get('msg')) {
            this.convocados.push(data['convocados'][key]);
          }
        }
      }, error => {
        this.source = 'LOCAL';
        this.load_data();
        console.log(error);
      }
    );
  }
  public getSelecaoName(id: any) {
    if (id > 0 && id < this.selecoes.length) {
      let element = this.selecoes[id].name;
      return element;
    }
  }
}
