import { Component, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {RouterModule,Routes,Router} from '@angular/router';
import {PropositionService} from './service/proposition.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {FormGroup,FormBuilder} from "@angular/forms";
import * as moment from 'moment';

@Component({
  templateUrl: './proposition.component.html'
})


export class PropositionComponent {

  form : FormGroup;
  date: DateModel;
  options: DatePickerOptions;
  thematiques;

  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
 
  constructor(formBuilder: FormBuilder, private propositionService: PropositionService) {
	moment.locale('fr');
    this.options = {
			  locale: "fr",
			};
	this.form = formBuilder.group({
            'nom' : [''],
            'prenom' : [''],
            'email' : [''],
            'telephone' : [''],
            'thematique':[''],
            'objectif':[''],
            'typeaction':[''],
            'dateprevision':[''],
            'populationcible':[''],
            'zonegeographique':[''],
            'dureeaction':[''],
            'budgetprevisionnel':[''],
            'typesoutien':[''],
            'annexe':[''],
            'etat':['']
        });

		this.files = []; // local uploading files array
	    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
	    this.humanizeBytes = humanizeBytes;
	}

  ngOnInit(){
        this.getAllThematiques();
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
  	this.propositionService.saveFormElements(dto);
	}


  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

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
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
}
