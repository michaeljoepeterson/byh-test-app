import React from 'react';
import {getResponses} from '../actions/actions';

export default class AssignWork extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            responses:null,
            filters:{},
            assigneeModal:false
        };
    }

    render(){
        return(
            <div>
                <p>Assign Work</p>
                {this.props.testProp}
            </div>
        );
    }
}