import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BasicComponent } from './basic.component';
import { PropositionComponent } from './proposition.component';

import { RouterModule, Routes } from '@angular/router';

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
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
