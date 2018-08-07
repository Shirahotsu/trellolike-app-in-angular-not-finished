import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Globals } from '../../../services/globals';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../../../services/get-data.service';
// import { EventEmitter } from '@angular/core'
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
  @Output() someEvent = new EventEmitter<string>();
  url:string = "http://localhost:3000/addTable";
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
    let name = this.createTableForm.value.name;
    let index = this.lastIndex + 1;
    this.http.post(this.url, {name: name, index: index}, httpOptions)
    .subscribe(
      x => {
        this.clg(x)
      },
      err =>{
        this.clg(err)

      },
      ()=>{
        this.clg('completed')
      }
    );
    setTimeout(()=>{
      console.log("KURWAAAA");
      this.someEvent.next();
    },1000);
    this.someEvent.next();

    this.cancle();
  }
  cancle(){
    this.g.isCreatingTable = false;
    this.g.get();
  }
  clg(e){
    console.log(e);
  }
  showConfig() {
    this.data.getConfig()
      .subscribe((data: any) => {
        this.data = data;
        this.lastIndex = data.length;
        console.log(this.lastIndex);
        return this.lastId;
      });
  }
  callParent() {
    console.log("AAAAA");

    this.someEvent.next();
  }
}
