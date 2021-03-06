import { Component, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {RouterModule,Routes,Router} from '@angular/router';
import {PropositionService} from './service/proposition.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {FormGroup,FormBuilder,Validators,AbstractControl} from "@angular/forms";
import * as moment from 'moment';
import * as $ from 'jquery';
import {FormValidator} from  './validator/formvalidator';

@Component({
  templateUrl: './proposition.component.html'
})


export class PropositionComponent {

  form : FormGroup;
  date: DateModel;
  options: DatePickerOptions;
  thematiques;

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
 
  showCheck : boolean = false;

  fileName : string = "";

  myEmail: AbstractControl;
  myPhone: AbstractControl;
  myDuree: AbstractControl;
  myBudget: AbstractControl;

  constructor(formBuilder: FormBuilder, private propositionService: PropositionService,private router:Router) {
	  moment.locale('fr');
    this.options = {
			  locale: "fr",
			};

	  this.form = formBuilder.group({
            'nom' : [''],
            'prenom' : [''],
            'email' : ['', Validators.compose([FormValidator.isValidMailFormat])],
            'telephone' : ['', Validators.compose([FormValidator.isAPhoneNumber])],
            'thematique':[''],
            'objectif':[''],
            'typeaction':[''],
            'dateprevision':[''],
            'populationcible':[''],
            'zonegeographiqe':[''],
            'dureeaction':['', Validators.compose([FormValidator.isAValidNumber])],
            'budgetprevisionnel':['', Validators.compose([FormValidator.isAValidNumber])],
            'typesoutien':[''],
            'annexe':[''],
            'etat':['']
        });

    // This is our new property, which we will access from the template
    this.myEmail = this.form.controls['email'];
    this.myPhone = this.form.controls['telephone'];
    this.myDuree = this.form.controls['dureeaction'];
    this.myBudget = this.form.controls['budgetprevisionnel'];

		this.files = []; // local uploading files array
	  this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
	  this.humanizeBytes = humanizeBytes;
	}

  ngOnInit(){
        this.getAllThematiques();
    }

     addScripts(chemin){
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = chemin;
    $("body").append( script );
  }

  ngAfterViewInit(){
        this.addScripts('assets/js/submitAnnexe.js');       
  }

  getAllThematiques(){
      this.propositionService.getAllThematiques().subscribe(thematique => {
          this.thematiques = thematique;
      });
  }

  displayTheme(value){
    console.log(value);
  }

  onSubmit(dto){
  	//this.propositionService.saveFormElements(dto);
    console.log(' HERRE !!! ');
    let porteur = { "nom": dto.nom,
                    "prenom" : dto.prenom,
                    "email" : dto.email,
                    "numeroTelephone" : dto.telephone
                  };
                      
    this.propositionService.savePorteurProjet(porteur).subscribe(
      porteur => {
        let proposition = { "thematique": dto.thematique,
                            "objectif" : dto.objectif,
                            "typeAction" : dto.typeaction,
                            "datePrevision" : dto.dateprevision.formatted,
                            "populationCible": dto.populationcible,
                            "zoneGeographiqe" : dto.zonegeographiqe,
                            "dureeAction" : dto.dureeaction,
                            "budgetPrevisionnel" : dto.budgetprevisionnel,
                            "typeSoutien": dto.typesoutien,
                            "annexe" : $('#file').val(),
                            "etat" : dto.etat,
                            "porteurProjet":porteur
                              };
          this.propositionService.saveProposition(proposition).subscribe(
            proposition => {
              $('#btnSubmit').click();
               this.router.navigate(['/basic']);
            }
          )
      }
    )


	}


  onUploadOutput(output: UploadOutput): void {
    console.log("output file name");
    console.log(output.file.name); // lets output to see what's going on in the console
    this.fileName = output.file.name;

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    }
  }

  startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:8080/fondation/public/addFichierProposition',
      method: 'POST',
      data: { foo: 'bar' },
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
    this.showCheck = true;
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
}
