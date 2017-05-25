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