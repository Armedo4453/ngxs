import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import {  GetUsers } from "../actions/app.action";
import { UserutilityService } from "../userutility.service";



export class UserStateModel{
    users:any;
}

@State<UserStateModel>({

    name:'appstate',
    defaults:{
        users:[]
    }
})

@Injectable()
export class Appstate{
constructor(private ur:UserutilityService){}


@Selector()
static selectStateData(state:UserStateModel){
    return state.users;
}

@Action(GetUsers)
getDataFromState(con:StateContext<UserStateModel>)
{
    return this.ur.fetchUsers().pipe(tap(returnData=>{
        const state=con.getState();
        con.setState({

            ...state,
            users:returnData

        })
    }))
}


}