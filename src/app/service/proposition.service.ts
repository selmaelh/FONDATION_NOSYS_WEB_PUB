import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions} from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class PropositionService {

    APIURL = 'http://localhost:8080/fondation'; 

    constructor(private http: Http){}
    
    getAllThematiques(){           
        return this.http.get(this.APIURL+'/public/thematiques')
               .map(response => response.json());
    }

    saveFormElements(dto){
        console.log("Form elements :"+JSON.stringify(dto));
        // make porteur Object
        let porteur = { "nom": dto.nom,
                        "prenom" : dto.prenom,
                        "email" : dto.email,
                        "numeroTelephone" : dto.telephone
                        };
        console.log("Porteur projet :"+JSON.stringify(porteur));

        // make proposition Object
        let proposition = { "thematique": dto.thematique.intitule,
                            "objectif" : dto.objectif,
                            "typeaction" : dto.typeaction,
                            "dateprevision" : dto.dateprevision.formatted,
                            "populationcible": dto.populationcible,
                            "zonegeographique" : dto.zonegeographique,
                            "dureeaction" : dto.dureeaction,
                            "budgetprevisionnel" : dto.budgetprevisionnel,
                            "typesoutien": dto.typesoutien,
                            "annexe" : dto.annexe,
                            "etat" : dto.etat
                            };

        console.log("Proposition :"+JSON.stringify(proposition));

        // save elements
        this.savePorteurProjet(porteur);
        return this.http.post(this.APIURL+'/public/addProposition',proposition)
            .map(response => response.json()
            );
    }

    savePorteurProjet(porteur){
        return this.http.post(this.APIURL+'/public/addPorteurProjet',porteur)
            .map(response => response.json()
            );
    }

}