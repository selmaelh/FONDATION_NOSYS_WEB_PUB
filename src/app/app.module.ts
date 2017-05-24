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


const appRoutes: Routes = [
  { path: '',
    redirectTo: '/basic',
    pathMatch: 'full'
  },
  { path: 'proposition', component: PropositionComponent },
  { path: 'basic', component: BasicComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PropositionComponent,
    BasicComponent
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
