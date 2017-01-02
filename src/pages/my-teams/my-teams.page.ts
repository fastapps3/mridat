import { Component } from '@angular/core';
import {NavController,LoadingController} from 'ionic-angular';
// import * as firebase from 'firebase';

//import {Tournaments,TeamHome} from '../../pages/pages';
//import {EliteApi, UserSettings} from '../../shared/shared'

@Component({
    selector: '',
    templateUrl: 'my-teams.page.html'
})

export class MyTeamPage {
    favorites = [
        {
             team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
             tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'March Madness Tournament'
       },
        {
          team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
            tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
            tournamentName: 'Holiday Hoops Challenge'
        }
    ];
    
    constructor(
        private nav: NavController, 
        private loadingController:LoadingController
       // private eliteApi:EliteApi,
        //private userSettings:UserSettings
        ) { 

        }

    goToTournaments() {
        console.log("Clicked");
       // this.nav.push(Tournaments);
    }

    favoriteTapped($event,item){
        console.log("Item is", item);
        let loader=this.loadingController.create({
            content: 'Getting data ...',
            dismissOnPageChange: true
        });
        loader.present();
       /* this.eliteApi.getTournamentData(item.tournamentId)
            .subscribe(t=>this.nav.push(TeamHome,item.team));*/
    }

    ionViewDidEnter(){
        console.log("Inside My Teams");
        //this.userSettings.getAllFavorites().then(retVal=>this.favorites=retVal);
    }
}