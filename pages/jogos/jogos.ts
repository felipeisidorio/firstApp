import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRussiaProvider } from '../../providers/api-russia/api-russia';


@IonicPage()
@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html',
  providers: [
    ApiRussiaProvider
  ],
})
export class JogosPage {
  public source = '';
  public jogosFinais: Array<any> = new Array<any>();
  public jogosGrupos: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private jogosPrivider: ApiRussiaProvider
  ) {

  }
  ionViewDidLoad() {
    this.load_data();
  }
  doRefresh(refresher) {
    this.load_data();
    refresher.complete();
  }
  load_data() {
    this.jogosFinais = new Array<any>();
    this.jogosGrupos = new Array<any>();

    this.jogosPrivider.getDados(this.source).subscribe(
      data => {
        /* Tratamento Grupos Inicio*/
        for (const key1 in data['groups']) {
          if (data['groups'].hasOwnProperty(key1)) {
            let vRodada: Array<any> = new Array<any>();
            for (let key2 = 0; key2 < data['groups'][key1]['matches'].length; key2++) {
              let vJogo1 = {
                dt_hr_partida: new Date(data['groups'][key1]['matches'][key2].date),
                ico_mandante: data['teams'][data['groups'][key1]['matches'][key2].home_team - 1].flag,
                mandante: data['teams'][data['groups'][key1]['matches'][key2].home_team - 1].name,
                mandanteCode: data['teams'][data['groups'][key1]['matches'][key2].home_team - 1].fifaCode,
                placar_mandante: data['groups'][key1]['matches'][key2].home_result,
                placar_visitante: data['groups'][key1]['matches'][key2].away_result,
                visitante: data['teams'][data['groups'][key1]['matches'][key2].away_team - 1].name,
                visitanteCode: data['teams'][data['groups'][key1]['matches'][key2].away_team - 1].fifaCode,
                ico_visitante: data['teams'][data['groups'][key1]['matches'][key2].away_team - 1].flag,
                local: data['stadiums'][data['groups'][key1]['matches'][key2].stadium - 1].name,
                fase: data['groups'][key1].name
              };
              key2++;
              let vJogo2 = {
                dt_hr_partida: new Date(data['groups'][key1]['matches'][key2].date),
                ico_mandante: data['teams'][data['groups'][key1]['matches'][key2].home_team - 1].flag,
                mandante: data['teams'][data['groups'][key1]['matches'][key2].home_team - 1].name,
                mandanteCode: data['teams'][data['groups'][key1]['matches'][key2].home_team - 1].fifaCode,
                placar_mandante: data['groups'][key1]['matches'][key2].home_result,
                placar_visitante: data['groups'][key1]['matches'][key2].away_result,
                visitante: data['teams'][data['groups'][key1]['matches'][key2].away_team - 1].name,
                visitanteCode: data['teams'][data['groups'][key1]['matches'][key2].away_team - 1].fifaCode,
                ico_visitante: data['teams'][data['groups'][key1]['matches'][key2].away_team - 1].flag,
                local: data['stadiums'][data['groups'][key1]['matches'][key2].stadium - 1].name,
                fase: data['groups'][key1].name
              };
              vRodada.push({
                // name: (key2 + 1) / 2,
                name: data['groups'][key1]['matches'][key2].matchday,
                jogo1: vJogo1,
                jogo2: vJogo2
              });
            }
            this.jogosGrupos.push({
              name: data['groups'][key1].name,
              rodadas: vRodada
            });
          }
        }
        /* Tratamento Grupos Inicio*/
        /* Tratamento Finais Inicio*/
        for (const key1 in data['knockout']) {
          if (data['knockout'].hasOwnProperty(key1)) {
            let jogos: Array<any> = new Array<any>();
            for (let key2 = 0; key2 < data['knockout'][key1]['matches'].length; key2++) {
              let jogo: any;
              
              if (isNaN(data['knockout'][key1]['matches'][key2].home_team)
                || isNaN(data['knockout'][key1]['matches'][key2].away_team)
                //|| data['knockout'][key1]['matches'][key2].home_team > 32
              ) {

                jogo = {
                  name: data['knockout'][key1]['matches'][key2].name,
                  dt_hr_partida: new Date(data['knockout'][key1]['matches'][key2].date),
                  ico_mandante: "assets/imgs/russia.png",
                  mandante: data['knockout'][key1]['matches'][key2].home_team,
                  mandanteCode: data['knockout'][key1]['matches'][key2].home_team,

                  placar_mandante: data['knockout'][key1]['matches'][key2].home_result,
                  placar_visitante: data['knockout'][key1]['matches'][key2].away_result,

                  visitanteCode: data['knockout'][key1]['matches'][key2].away_team,

                  visitante: data['knockout'][key1]['matches'][key2].away_team,
                  ico_visitante: "assets/imgs/russia.png",
                  local: data['stadiums'][data['knockout'][key1]['matches'][key2].stadium - 1].name,
                  fase: data['knockout'][key1].name
                };
              } else {

                jogo = {
                  name: data['knockout'][key1]['matches'][key2].name,
                  dt_hr_partida: new Date(data['knockout'][key1]['matches'][key2].date),
                  ico_mandante: data['teams'][data['knockout'][key1]['matches'][key2].home_team - 1].flag,
                  mandante: data['teams'][data['knockout'][key1]['matches'][key2].home_team - 1].name,
                  mandanteCode: data['teams'][data['knockout'][key1]['matches'][key2].home_team - 1].fifaCode,

                  placar_mandante: data['knockout'][key1]['matches'][key2].home_result,
                  placar_visitante: data['knockout'][key1]['matches'][key2].away_result,

                  visitante: data['teams'][data['knockout'][key1]['matches'][key2].away_team - 1].name,
                  visitanteCode: data['teams'][data['knockout'][key1]['matches'][key2].away_team - 1].fifaCode,
                  ico_visitante: data['teams'][data['knockout'][key1]['matches'][key2].away_team - 1].flag,

                  local: data['stadiums'][data['knockout'][key1]['matches'][key2].stadium - 1].name,
                  fase: data['knockout'][key1].name
                };
              }

              jogos.push(jogo);
            }
            this.jogosFinais.push({
              fase: data['knockout'][key1].name,
              jogosFase: jogos
            })
          }
        }
        /* Tratamento Grupos fim*/
      }, error => {
        this.source = 'LOCAL';
        this.load_data();
        console.log(error);
      }
    );
  }

  openTelaSelecoes(msg: string): void {
    if (msg.search("_") < 0) {
      this.navCtrl.push('SelecoesPage', { msg });
    }
  }
}
