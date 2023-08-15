import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsers } from '../actions/app.action';
import { Appstate } from '../states/app.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm:FormGroup|any;
  userInfo:[]|any;
  @Select(Appstate.selectStateData) userInfo$:Observable<any> | undefined
  constructor(private store:Store, private fb:FormBuilder) { }

  ngOnInit(): void {
this.userForm=this.fb.group({

  id:[''],
  name:[''],
  username:[''],
  email:[''],
  phone:[''],
  website:['']
})

this.userInfo$?.subscribe((returnData)=>{
  this.userInfo=returnData;
  if (this.userInfo.length === 0) {
    this.store.dispatch(new GetUsers());
  }
})

  }
}
