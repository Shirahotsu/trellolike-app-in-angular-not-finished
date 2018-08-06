import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {Tablica} from '../models/tablica.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  public url:string;
  public tableData:Tablica;
  constructor(private http: HttpClient) {
    this.url = "http://127.0.0.1:3000";
    // this.url = "../../assets/data/data.json";
  }
  getConfig() {
    return this.http.get(this.url);
  }
  createTable(id, name){
  this.tableData={
    id: id,
    name: name
  };
    return this.http.put(this.url, this.tableData, httpOptions)
  }
}
