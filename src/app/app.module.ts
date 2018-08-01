import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TabliceComponent } from './components/tablice/tablice.component';
import { GetDataService } from './services/get-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TabliceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
