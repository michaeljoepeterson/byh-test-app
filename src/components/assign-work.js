import React from 'react';
import {getEmployees} from '../actions/actions';
import AssignCard from './sub-components/assign-card';
import Button from '@material-ui/core/Button';

export default class AssignWork extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            employees:null
        };
    }

    componentDidMount(){
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

    buildCards = () => {
        let cards = this.props.selectedWork.map(work => {
            return (
                <AssignCard key={work.id} workRequest={work} employees={this.state.employees}/>
            )
        });

        return cards
    }

    saveAssignees = () => {

    }

    render(){
        //console.log(empl)
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