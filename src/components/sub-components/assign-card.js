import React from 'react';
import FilterControl from './filter-control';

export default class AssignCard extends React.Component{
    constructor(props) {
        super(props);
        this.filterTitle = 'Employee';
        this.filterTarget = 'name';
        this.state = {
            selecteEmployees:null
        };
    }

    componentDidMount(){
    }

    handleFilterChanged = (newVal,title) => {
        console.log(newVal,title);
    }


    render(){
        //console.log(empl)
        const workerFilter = this.props.employees && this.props.employees.length > 0 ? (<FilterControl responses={this.props.employees} title={this.filterTitle} target={this.filterTarget} filterChanged={this.handleFilterChanged}/>) : null;
        return(
            <div>
                <p>Work Requested by {this.props.workRequest.Name}</p>
                {workerFilter}
            </div>
        );
    }
}