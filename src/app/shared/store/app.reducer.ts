import { createReducer, on } from "@ngrx/store";
import { setAPIStatus } from "./app.action";
import { Appstate } from "./appstate";

export const initialState: Appstate = {  //initialState is conventional way of setting up reducer state variable
    apiStatus: '',
    apiResponseMessage: ''
}

export const appReducer = createReducer(
    initialState,
    on(setAPIStatus, (state, {apiStatus}) => {
        return apiStatus
    })
)