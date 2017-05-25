import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions} from '@angular/http';
import { HttpModule, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Porteur } from './porteur';

@Injectable()
export class PropositionService {

    APIURL = 'http://localhost:8080/fondation'; 

    postResponse : Porteur = new Porteur();

    constructor(private http: Http){}
    
    getAllThematiques(){           
        return this.http.get(this.APIURL+'/public/thematiques')
               .map(response => response.json());
    }

    saveFormElements(dto){

        let headers = new Headers();
        headers.append("Content-Type","application/json");  
        let options = new RequestOptions({headers: headers});            

        console.log("Form elements :"+JSON.stringify(dto));
        // make porteur Object
        let porteur = { "nom": dto.nom,
                        "prenom" : dto.prenom,
                        "email" : dto.email,
                        "numeroTelephone" : dto.telephone
                        };

        console.log("Porteur projet :"+JSON.stringify(porteur));

        // saving porteur
        this.savePorteurProjet(porteur);

        console.log("*** "+this.postResponse.getIdPorteur());

        // make proposition Object
        let proposition = { "thematique": dto.thematique,
                            "objectif" : dto.objectif,
                            "typeAction" : dto.typeaction,
                            "datePrevision" : dto.dateprevision.formatted,
                            "populationCible": dto.populationcible,
                            "zoneGeographiqe" : dto.zonegeographiqe,
                            "dureeAction" : dto.dureeaction,
                            "budgetPrevisionnel" : dto.budgetprevisionnel,
                            "typeSoutien": dto.typesoutien,
                            "annexe" : dto.annexe,
                            "etat" : dto.etat,
                            "porteurProjet":this.postResponse
                            };

        // saving proposition
        this.saveProposition(proposition);
    }


    savePorteurProjet(porteur) {

        let headers = new Headers();
        headers.append("Content-Type","application/json");  
        let options = new RequestOptions({headers: headers});            


        return this.http.post(this.APIURL+'/public/addPorteurProjet',porteur,options)
                        .map((res: Response) => res.json());
        }

    saveProposition(proposition) {

        let headers = new Headers();
        headers.append("Content-Type","application/json");  
        let options = new RequestOptions({headers: headers});            


        return this.http.post(this.APIURL+'/public/addProposition',proposition,options)
                        .map((res: Response) => res.json());
        }

}