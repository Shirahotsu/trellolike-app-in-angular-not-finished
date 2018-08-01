import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Tablica } from '../../models/tablica.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-tablice',
  templateUrl: './tablice.component.html',
  styleUrls: ['./tablice.component.scss']
})
export class TabliceComponent implements OnInit {
  editTable:number;
  data:any;
  lastIndex:any;
  lastId:number;
  url:string;
  tableData:Tablica;
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';

  constructor(getData: GetDataService, private http: HttpClient, private fb: FormBuilder) {
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'validate' : ''
    });
    this.data = getData;
    this.url = "../../assets/data/data.json";

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
        this.data = data;
        console.log(data);
        this.lastIndex = data.length;
        // console.log(this.lastIndex);
        for(let i = 0; i<this.data.length; i++){
          this.lastId = data[i].id;
        }
      });
  }
  createTable(e){
    console.log(e);

    this.tableData={
      id: this.lastId,
      name: e
    };
  this.http.put(this.url, this.tableData, httpOptions)
  .subscribe(
    result => {
      // Handle result
      console.log(result)
    },
    error => {
      console.log(error)
    },
    () => {
      // 'onCompleted' callback.
      // No errors, route to new page here
    }
  );
  }
  editTableChange(e){
    console.log(e);
    this.editTable = e;
  }
  addPost(post) {
    this.name = post.name;
    console.log(this.name);
  }
}
