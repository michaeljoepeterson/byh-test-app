import {API_BASE_URL,GET_S} from '../config';
import { useControlled } from '@material-ui/core';

export async function getResponses(){
    try{
        let  buf = btoa(GET_S); 
        let url = `${API_BASE_URL}/test?secret=${buf}`;
        let responses = await fetch(url);
        let jsonRes = await responses.json();
        jsonRes.results = jsonRes.results.map(resp => {
            resp.hide = false;
            return resp;
        });
        return jsonRes.results;
    }
    catch(err){
        throw(err);
    }
}

export async function getEmployees(){
    try{
        let  buf = btoa(GET_S); 
        let url = `${API_BASE_URL}/employees?secret=${buf}`;
        let responses = await fetch(url);
        let jsonRes = await responses.json();
        return jsonRes.results;
    }
    catch(err){
        throw(err);
    }
}