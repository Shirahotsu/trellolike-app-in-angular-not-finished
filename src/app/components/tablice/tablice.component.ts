import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Tablica } from '../../models/tablica.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../services/globals'


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
  tableData:Tablica;
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';
  isCreating: boolean = false;
  g:Globals;
  isCreatingTable:boolean;
  constructor(getData: GetDataService, private http: HttpClient, private fb: FormBuilder, globals: Globals) {
    this.g = globals;
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
    this.data.getConfig()
      .subscribe((data: any) => {
        this.dataOtp = data;
        this.lastIndex = this.dataOtp.length;
        // console.log(this.lastIndex);
        for(let i = 0; i<this.dataOtp.length; i++){
          this.lastId = data[i].id;
        }
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
  editTableChange(e){
    this.editTable = e;
  }
  addPost(post) {
    this.name = post.name;
  }
  clg(e){
    console.log(e);
  }
}
