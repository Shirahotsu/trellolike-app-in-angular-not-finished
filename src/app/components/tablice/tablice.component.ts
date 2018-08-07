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
  addUrl:string = "http://localhost:3000/addTable";
  isShown: boolean = false;
  createTableForm = new FormGroup({
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
    this.getTabLen();
    console.dir(this.data)
  }
  ngAfterViewInit() {

  }
  showConfig() {
    this.clg('XDDD');
    this.clg('reloaded');

    this.data.getConfig()
      .subscribe((data: any) => {
        this.dataOtp = data;
      });
  }
  getTabLen(){
    this.data.getConfig()
      .subscribe((data: any) => {
        this.lastIndex = data.length;
        console.log(this.lastIndex);
        return this.lastId;
      });
  }
  createTable(){
    this.isCreating = true;
    this.isCreatingTable = true;
    this.g.isCreatingTable = true;
  }
  deleteTable(e){
    this.clg('usun');
    this.http.post(this.delUrl, {id: e})
    .subscribe(
      x => {
        this.clg("xxx")
      },
      // err =>{
      //   this.clg("err")

      // },
      ()=>{
        setTimeout(()=>{
          this.showConfig();
        },100)
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
      setTimeout(()=>{
        this.showConfig();
      },100)
      }
    );
  }
  onSubmit(){
    let name = this.createTableForm.value.name;
    let index = this.lastIndex + 1;
    this.http.post(this.addUrl, {name: name, index: index}).subscribe(
      x => {
        this.clg("xxx")
      },
      // err =>{
      //   this.clg("err")

      // },
      ()=>{
        setTimeout(()=>{
          this.showConfig();
        },100)
      }
    );
    this.cancle();
  }

  cancle(){
    this.g.isCreatingTable = false;
    this.g.get();
  }


}
