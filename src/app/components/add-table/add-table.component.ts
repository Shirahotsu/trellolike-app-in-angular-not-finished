import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Globals } from '../../services/globals';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../../services/get-data.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {
  url:string = "http://localhost:3000/login";
  isShown: boolean = false;
  isCreatingTable:boolean;
  g:Globals;
  data: any;
  lastIndex:any;
  lastId:number;
  createTableForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(private globals:Globals, private http:HttpClient, getData: GetDataService) {
    this.g = this.globals;
    this.isCreatingTable = this.g.isCreatingTable;
    this.data = getData;
  }
  // this.isCreatingTable = this.g.isCreatingTable;
  ngOnInit() {
    this.showBtns();
    this.showConfig();
  }
  showBtns(){
  setTimeout(()=>{
    this.isShown = true;
  },1000)
  }
  onSubmit(){
    console.warn(this.createTableForm.value.name);
    console.warn(this.lastId);
    let name = this.createTableForm.value.name;
    let newId = this.lastId+1;
    this.http.post(this.url, {id:newId, name: name})
    .subscribe(
      res => {
        console.log(res);
      })
  }
  cancle(){
    console.log(123)
    this.g.isCreatingTable = false;
    this.g.get();
  }
  showConfig() {
    this.data.getConfig()
      .subscribe((data: any) => {
        this.data = data;
        console.log(data);
        this.lastIndex = data.length;
        console.log(this.lastIndex);
        for(let i = 0; i<this.data.length; i++){
          this.lastId = data[i].id;
          console.log(this.lastId);
        }
        console.log(this.lastId);
        return this.lastId;
      });
  }
}
