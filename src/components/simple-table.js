import React from 'react';
import {getResponses} from '../actions/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class ExampleTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            responses:null
        };
    }

    componentDidMount(){

    }

    buildTable = () =>{

        let rows = [];
        for(let i = 0;i < this.props.lessons.length;i++){
            let lesson = this.props.lessons[i];
            let studentString = '';
            for(let k = 0;k < lesson.students.length;k++){
                let student = lesson.students[k];
                studentString += student.firstName + ' ' + student.lastName;
                if(k !== lesson.students.length - 1){
                    studentString += ',';
                } 
            }
            let date = new Date(lesson.date);
            rows.push(
                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {date.toDateString() + ' : ' + date.toLocaleTimeString()}
                    </TableCell>
                    <TableCell align="right">{lesson.lessonType}</TableCell>
                    <TableCell align="right">{lesson.notes}</TableCell>
                    <TableCell align="right">{studentString}</TableCell>
                    <TableCell align="right">{lesson.teacher.email}</TableCell>
                </TableRow>
            )
        }

        return(<TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Lesson Type</TableCell>
                    <TableCell align="right">Notes</TableCell>
                    <TableCell align="right">Students</TableCell>
                    <TableCell align="right">Teacher</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
            </TableContainer>
        );
    }

    render(){
        //console.log(this.state);
        console.log('example table:',this.state);
        const table = this.state.responses && this.state.responses.length > 0? this.buildTable() : []; 
        return(
            <div>
                {table}
                <p>test</p>
            </div>
        );
    }
}
