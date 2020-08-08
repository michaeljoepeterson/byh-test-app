import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FilterControl(props){
    const removeCopies = (responses) => {
        let foundResponses = {};
        let filteredResponses = responses.filter(resp => {
            if(!foundResponses[resp[props.target]]){
                foundResponses[resp[props.target]] = resp[props.target];
                return resp;
            }
        });

        return filteredResponses;
    }

    const filterChanged = (event,newValue) =>{
        props.filterChanged(newValue,props.target);
    }
    
    const buildFilter = () => {
        let copiedResponses = props.responses.filter(resp => {
            //if(!resp.hide){
                return resp;
            //}
        });
        let filteredResponses = removeCopies(copiedResponses);
        const filter = (
            <Autocomplete
                id="combo-box-demo"
                onChange={(e,newValue) => filterChanged(e,newValue) }
                options={filteredResponses}
                getOptionLabel={(option) => option[props.target] ? option[props.target] : ''}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={props.title ? props.title : props.target} variant="outlined" />}
                />
        );

        return filter
    }

    const filter = buildFilter();

    return(
        <div className="filter-container">
            {filter}
        </div>
    );
}