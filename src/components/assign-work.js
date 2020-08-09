import React from 'react';
import {getEmployees} from '../actions/actions';
import AssignCard from './sub-components/assign-card';

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
                <AssignCard workRequest={work} employees={this.state.employees}/>
            )
        });

        return cards
    }

    render(){
        //console.log(empl)
        const cards = this.props.selectedWork && this.props.selectedWork.length > 0 && this.state.employees  ?  this.buildCards() : null;

        return(
            <div>
                <p>Assign Work</p>
                {cards}
            </div>
        );
    }
}