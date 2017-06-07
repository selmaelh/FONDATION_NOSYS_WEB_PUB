import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic.component';
import { PropositionComponent } from './proposition.component';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerModule } from 'ng2-datepicker';
import { PropositionService } from './service/proposition.service';
import { NgUploaderModule } from 'ngx-uploader';
import { PresidentWordComponent} from './presidentword.component';
import {QuiSomNousComponent} from './quisomnous.component';
import {AgirComponent} from './agir.component';
import {EvenementunComponent} from './evenementun.component';
import {EvenementdeuxComponent} from './evenementdeux.component';
import {EvenementtroisComponent} from './evenementtrois.component';
import {EvenementquatreComponent} from './evenementquatre.component';
import {EvenementcinqComponent} from './evenementcinq.component';
import {DomunComponent} from './domun.component';
import {DomtroisComponent} from './domtrois.component';
import {DomquatreComponent} from './domquatre.component';
import {DomdeuxComponent} from './domdeux.component';


const appRoutes: Routes = [
  { path: '',
    redirectTo: '/basic',
    pathMatch: 'full'
  },
  { path: 'proposition', component : PropositionComponent },
  { path: 'basic', component : BasicComponent },
  { path: 'presidentword', component : PresidentWordComponent},
  { path: 'quisommenous' , component : QuiSomNousComponent},
  { path: 'agir' , component : AgirComponent},
  { path: 'evun' , component : EvenementunComponent},
  { path: 'evdeux' , component : EvenementdeuxComponent},
  { path: 'evtrois' , component : EvenementtroisComponent},
  { path: 'evquatre' , component : EvenementquatreComponent},
  { path: 'evcinq' , component : EvenementcinqComponent},
  { path: 'domun' , component : DomunComponent},
  { path: 'domtrois' , component : DomtroisComponent},
  { path: 'domquatre' , component : DomquatreComponent},
  { path: 'domdeux' , component : DomdeuxComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PropositionComponent,
    BasicComponent,
    PresidentWordComponent,
    QuiSomNousComponent,
    AgirComponent,
    EvenementunComponent,
    EvenementdeuxComponent,
    EvenementtroisComponent,
    EvenementquatreComponent,
    EvenementcinqComponent,
    DomunComponent,
    DomtroisComponent,
    DomquatreComponent,
    DomdeuxComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    DatePickerModule,
    NgUploaderModule
  ],
  providers: [PropositionService],
  bootstrap: [AppComponent]
})

export class AppModule { }
