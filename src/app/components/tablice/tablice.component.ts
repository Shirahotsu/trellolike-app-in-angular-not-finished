import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Tablica } from '../../models/tablica.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Globals } from '../../services/globals';



@Component({
  selector: 'app-tablice',
  templateUrl: './tablice.component.html',
  styleUrls: ['./tablice.component.scss']
})
export class TabliceComponent implements OnInit {
  editTable:number;
  data:GetDataService;
  dataOtp: any;
  lastIndex:any;
  lastId:number;
  url:string;
  delUrl: string;
  updateUrl: string;
  tableData:Tablica;
  // rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';
  isCreating: boolean = false;
  g:Globals;
  isCreatingTable:boolean;
  rForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(getData: GetDataService, private http: HttpClient, private fb: FormBuilder, globals: Globals) {
    this.g = globals;
    this.delUrl = "http://localhost:3000/deleteTable";
    this.updateUrl = "http://localhost:3000/updateTable";
    this.isCreatingTable = this.g.isCreatingTable;
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'validate' : ''
    });
    this.data = getData;

}

  ngOnInit() {
    this.showConfig();
    console.dir(this.data)
  }
  ngAfterViewInit() {

  }
  showConfig() {
    this.clg('XDDD');
    this.data.getConfig()
      .subscribe((data: any) => {
        this.dataOtp = data;
        this.clg('pobrano');
      });
  }
  createTable(){
    this.isCreating = true;
    this.isCreatingTable = true;
    this.g.isCreatingTable = true;
    this.g.get();
  }
  // createTable(e){
  //   console.log(e);

  //   this.tableData={
  //     id: this.lastId,
  //     name: e
  //   };
  // this.http.put(this.url, this.tableData, httpOptions)
  // .subscribe(
  //   result => {
  //     // Handle result
  //     console.log(result)
  //   },
  //   error => {
  //     console.log(error)
  //   },
  //   () => {
  //     // 'onCompleted' callback.
  //     // No errors, route to new page here
  //   }
  // );
  // }
  deleteTable(e){
    this.clg('usun');
    this.http.post(this.delUrl, {id: e})
    .subscribe(
      res => {
        console.log(res);
      },
      err =>{
      this.clg(err);
      },
      ()=>{
        this.showConfig();
      }
    );
  }
  editTableChange(e){
    this.clg(e);
    this.editTable = e;
  }
  addPost(post) {
    this.name = post.name;
  }
  clg(e){
    console.log(e);
  }
  editTableName(id){
    let name = this.rForm.value.name;
    this.http.post(this.updateUrl, {id: id, name: name})
    .subscribe(
      res => {
        console.log(res);
      },
      // err =>{
      //   this.clg(err);
      // },
      ()=>{
        this.editTableChange(-99);
      this.showConfig();
      }
    );
  }
}
