import React from 'react';
import FilterControl from './filter-control';
import Grid from '@material-ui/core/Grid';
import AddBox from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

export default class AssignCard extends React.Component{
    //todo
    /*
        add actions
        add any selected values to the filter control
        add ability to add more assignees
    */
    constructor(props) {
        super(props);
        this.filterTitle = 'Employee';
        this.filterTarget = 'name';
        this.dueDate = 'Due date';
        this.state = {
            selectedEmployees:null,
            employeeCount:1
        };
    }

    componentDidMount(){
        if(!this.props.selectedEmployees || this.props.selectedEmployees.length === 0){
            let employees = [this.props.employees[0]];
            this.setState({
                selectedEmployees:employees
            },() => {
                this.props.updateEmployees(this.props.workRequest.id,employees);
            });
        }
        else{
            let employeeCount = this.props.selectedEmployees.length
            this.setState({
                selectedEmployees:this.props.selectedEmployees,
                employeeCount
            }); 
        }
        
    }
    //need to set selected employee state
    handleFilterChanged = (newVal,title,index) => {
        let selectedEmployees = [...this.state.selectedEmployees];
        selectedEmployees[index] = newVal
        console.log(newVal,title,index);
        this.setState({
            selectedEmployees
        },() => {
            this.props.updateEmployees(this.props.workRequest.id,selectedEmployees);
        });
    }

    getDueDate = (dateTime) => {
        let date = new Date(dateTime);
        return date.toDateString() + ' : ' + date.toLocaleTimeString()
    }

    buildAssigneeFilters = () =>{
        let filters = [];
        console.log('selected employees=======',this.state.selectedEmployees);
        for(let i = 0;i < this.state.employeeCount;i++){
            let filter = (
                <Grid item md={3} xs={12} key={i}>
                    <FilterControl responses={this.props.employees} title={this.filterTitle} target={this.filterTarget} filterChanged={this.handleFilterChanged} value={this.state.selectedEmployees[i]} changeData={i}/>
                    <IconButton onClick={(e) => this.removeEmployee(i)} aria-label="remove student">
                        <CancelOutlinedIcon/>
                    </IconButton>
                </Grid>
            );
            
            filters.push(filter);
        }
        

        return filters;
    }

    addEmployee = () => {
        let count = this.state.employeeCount + 1;
        let selectedEmployees = [...this.state.selectedEmployees];
        selectedEmployees.push(this.props.employees[0]);
        this.setState({
            employeeCount:count,
            selectedEmployees
        },() => {
            this.props.updateEmployees(this.props.workRequest.id,selectedEmployees);
        });
    }
    //need to remove correct employee
    removeEmployee = (index) => {
        let count = this.state.employeeCount - 1 === 0 ? 0 : this.state.employeeCount - 1;
        let selectedEmployees = this.state.selectedEmployees.filter((employee,i) => i !== index); 
        this.setState({
            employeeCount:count,
            selectedEmployees
        },() => {
            this.props.updateEmployees(this.props.workRequest.id,selectedEmployees);
        });
    }

    render(){
        console.log(this.state);
        const workerFilter = this.props.employees && this.props.employees.length  > 0 && this.state.selectedEmployees ? this.buildAssigneeFilters() : null;
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
                            <IconButton aria-label="add student" onClick={(e) => this.addEmployee()}>
                                <AddBox />
                            </IconButton>
                        </h4>
                    </Grid>
                    <Grid container item xs={12}>
                        {workerFilter}
                    </Grid>
                </Grid>
                
            </Grid>
        );
    }
}