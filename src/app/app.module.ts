import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';

import { AppComponent } from './app.component';
import { TabliceComponent } from './components/tablice/tablice.component';
import { GetDataService } from './services/get-data.service';
import { AddTableComponent } from './components/tablice/add-table/add-table.component';
import { Globals } from './services/globals';

@NgModule({
  declarations: [
    AppComponent,
    TabliceComponent,
    AddTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [GetDataService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
