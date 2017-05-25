export class Porteur {

  private idPorteur: number;
  private nom: string;
  private prenom: string;
  private email: string;
  private numeroTelephone: string;

  setIdPorteur(value: number){
        this.idPorteur = value;
    }

  setNom(value: string){
        this.nom = value;
    }
  setPrenom(value: string){
        this.prenom = value;
    }

  setEmail(value: string){
        this.email = value;
    }

  setNumeroTelephone(value: string){
        this.numeroTelephone = value;
    }

  getIdPorteur(){
        return this.idPorteur;
    }

  getNom(){
        return this.nom;
    }
  getPrenom(){
        return this.prenom;
    }

  getEmail(){
        return this.email;
    }

  getNumeroTelephone(){
        return this.numeroTelephone;
    }
}
