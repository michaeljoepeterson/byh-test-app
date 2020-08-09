import React from 'react';
import FilterControl from './filter-control';
import Grid from '@material-ui/core/Grid';

export default class AssignCard extends React.Component{
    constructor(props) {
        super(props);
        this.filterTitle = 'Employee';
        this.filterTarget = 'name';
        this.dueDate = 'Due date';
        this.state = {
            selecteEmployees:null
        };
    }

    componentDidMount(){
    }

    handleFilterChanged = (newVal,title) => {
        console.log(newVal,title);
    }

    getDueDate = (dateTime) => {
        let date = new Date(dateTime);
        return date.toDateString() + ' : ' + date.toLocaleTimeString()
    }

    buildAssigneeFilters = () =>{
        
    }

    render(){
        //console.log(empl)
        const workerFilter = this.props.employees && this.props.employees.length > 0 ? (<FilterControl responses={this.props.employees} title={this.filterTitle} target={this.filterTarget} filterChanged={this.handleFilterChanged}/>) : null;
        return(
            <Grid container>
                <Grid item md={3} xs={12}>
                    <p>Work Requested by: {this.props.workRequest.Name}</p>
                    <p>Work Summary: {this.props.workRequest.Summary}</p>
                </Grid>
                <Grid item md={3} xs={12}>
                    <p>Due Date: {this.props.workRequest[this.dueDate] ? this.getDueDate(this.props.workRequest[this.dueDate]) : 'None' }</p>
                </Grid>
                <Grid item md={3} xs={12}>
                    <p>Priority: {this.props.workRequest.Priority}</p>
                </Grid>
                <Grid item md={3} xs={12}>
                    <p>Type: {this.props.workRequest.Type}</p>
                </Grid>
                <Grid className="assignees-container" container item xs={12}>
                    <Grid item xs={12}>
                        <h4>
                            Assignees
                        </h4>
                    </Grid>
                    <Grid item xs={12}>
                        {workerFilter}
                    </Grid>
                </Grid>
                
            </Grid>
        );
    }
}