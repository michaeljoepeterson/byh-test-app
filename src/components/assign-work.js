import React from 'react';
import {getEmployees,updateAssignees} from '../actions/actions';
import AssignCard from './sub-components/assign-card';
import Button from '@material-ui/core/Button';

export default class AssignWork extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            employees:null,
            employeeData:null
        };
    }

    componentDidMount(){
        this.buildWorkData();
        this.getResults();
    }

    async getResults(){
        try{
            let employees = await getEmployees();
            this.setState({
                employees
            });
        }
        catch(err){
            console.log('error',err);
        }
        
    }

    buildWorkData = () =>{
        let employeeData = {};

        for(let i = 0;i < this.props.selectedWork.length;i++){
            let work = this.props.selectedWork[i];
            employeeData[work.id] = work.assignees;
        }

        this.setState({
            employeeData
        });
    }

    buildCards = () => {
        let cards = this.props.selectedWork.map(work => {
            return (
                <AssignCard key={work.id} workRequest={work} employees={this.state.employees} selectedEmployees={work.assignees} updateEmployees={this.updateAssignees}/>
            )
        });

        return cards
    }
    /*
    changeEmployees = (id,employees) => {

    }

    addAssignee = (id,employees) => {

    }

    removeAssignee = (id,employees) =>{

    }
    */
    updateAssignees = (id,employees) =>{
        let newEmployees = [...employees];
        let employeeData = {...this.state.employeeData};
        employeeData[id] = newEmployees;
        this.setState({
            employeeData
        });
    }

    async saveAssignees() {
        try{
            console.log('Save Data ==================',this.state.employeeData);
            let response = await updateAssignees(this.state.employeeData);
            console.log('responses after update=================',response);
            this.props.assigneeUpdate();
        }
        catch(err){
            console.log('error saving', err);
        }
        
    }

    render(){
        console.log(this.state.employeeData);
        const cards = this.props.selectedWork && this.props.selectedWork.length > 0 && this.state.employees  ?  this.buildCards() : null;

        return(
            <div className="work-container">
                <h2>Assign Work</h2>
                {cards}
                <div>
                <Button onClick={(e) => this.saveAssignees(e)} variant="contained">Save</Button>
                </div>
            </div>
        );
    }
}