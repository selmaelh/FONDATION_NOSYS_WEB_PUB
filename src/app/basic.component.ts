import { Component } from '@angular/core';
import {RouterModule,Routes,Router,ActivatedRoute} from '@angular/router';
import {PropositionService} from './service/proposition.service'

@Component({
  selector: 'basic-comp',
  templateUrl: './basic.component.html'
})


export class BasicComponent {

  publications;
  constructor(private propositionService:PropositionService){}

  ngOnInit(){
    this.getVisiblePublications();
  }

  getVisiblePublications(){
    this.propositionService.getAllVisiblePublications().subscribe(
      publications => {
        this.publications = publications;
      }
    )
  }
}
