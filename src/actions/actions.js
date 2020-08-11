import {API_BASE_URL,GET_S,SAVE_S} from '../config';

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

function updateWorkAssignee(employees,id,buf){
    let promise = new Promise(async (resolve,reject) => {
        try{
            let url = `${API_BASE_URL}/test/assignee/${id}?secret=${buf}`;
            let employeeData = {
                employeeIds:employees
            };
            let options = {
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(employeeData)
            }
            let responses = await fetch(url,options);
            resolve(responses);
        }
        catch(err){
            reject(err);
        }
        
    });

    return promise;
}

async function regularResponse(responses){
    let jsonRes = [];
    for(let i = 0;i < responses.length;i++){
        let resp = responses[i];
        let jsonResp = await resp.json();
        jsonRes.push(jsonResp);
    }

    return jsonRes
}

export async function updateAssignees(employeeData){
    try{
        let  buf = btoa(SAVE_S); 
        let requests = [];
        for(let key in employeeData){
            let data = employeeData[key].map(employee => employee.id);
            requests.push(updateWorkAssignee(data,key,buf));
            
        }
        let res = await Promise.all(requests);
        //debugger;
        let jsonRes = await regularResponse(res);

        return jsonRes;
    }
    catch(err){
        throw(err);
    }
}