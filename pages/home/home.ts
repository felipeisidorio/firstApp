import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRussiaProvider } from '../../providers/api-russia/api-russia';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public source: string = "";
  public jogosDay: Array<any> = new Array<any>();
  public msg: string = "Carregando ...";

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
    this.jogosDay = new Array<any>();
    let sysdate: Date = new Date(Date.now());
    const dataGrups: Date = new Date('Jun 29 2018 11:13:00');
    const dataGrupsFinal: Date = new Date('Jul 17 2018 11:13:00');

    this.jogosPrivider.getDados(this.source).subscribe(
      data => {
        if (sysdate < dataGrups) {
          this.jogosDay = new Array<any>();

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
                if (vJogo1.dt_hr_partida.getDate() == sysdate.getDate()
                  && vJogo2.dt_hr_partida.getDate() == sysdate.getDate()) {
                  vRodada.push({
                    name: (key2 + 1) / 2,
                    jogos: [vJogo1, vJogo2]
                  });
                } else if (vJogo1.dt_hr_partida.getDate() != sysdate.getDate()
                  && vJogo2.dt_hr_partida.getDate() == sysdate.getDate()) {
                  vRodada.push({
                    name: (key2 + 1) / 2,
                    jogos: [vJogo2]

                  });
                } else if (vJogo1.dt_hr_partida.getDate() == sysdate.getDate()
                  && vJogo2.dt_hr_partida.getDate() != sysdate.getDate()) {
                  vRodada.push({
                    name: (key2 + 1) / 2,
                    jogos: [vJogo1]
                  });
                }

              }
              if (vRodada.length > 0) {
                this.jogosDay.push({
                  name: data['groups'][key1].name,
                  rodadas: vRodada
                });
              }

            }
          }
          /* Tratamento Grupos Inicio*/
        } else if( sysdate < dataGrupsFinal) {
          this.jogosDay = new Array<any>();

          /* Tratamento Finais Inicio*/
          for (const key1 in data['knockout']) {
            if (data['knockout'].hasOwnProperty(key1)) {
              let jogos: Array<any> = new Array<any>();
              for (let key2 = 0; key2 < data['knockout'][key1]['matches'].length; key2++) {
                let jogo: any;


                if (isNaN(data['knockout'][key1]['matches'][key2].home_team)
                  || isNaN(data['knockout'][key1]['matches'][key2].away_team)
                 // || data['knockout'][key1].name != 'Round of 16'
                  || data['knockout'][key1]['matches'][key2].home_team > 32) {
  
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
                if (jogo.dt_hr_partida.getDate() == sysdate.getDate()) {
                  jogos.push(jogo);
                }
              }
              if (jogos.length > 0) {


                this.jogosDay.push({
                  fase: data['knockout'][key1].name,
                  jogosFase: jogos
                })
              }
            }
          }
          /* Tratamento Grupos fim*/
        }
        if (this.jogosDay.length > 0) {
          this.msg = null;
        } else {
          this.msg = "Não há jogo(s) marcado(s) hoje!";
        }

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
