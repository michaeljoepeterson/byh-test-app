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
        this.getResults();
    }

    async getResults(){
        try{
            let responses = await getResponses();
            this.setState({
                responses
            });
        }
        catch(err){
            console.log('error',err);
        }
        
    }

    buildTable = () =>{

        let rows = [];
        for(let i = 0;i < this.state.responses.length;i++){
            let response = this.state.responses[i];

            let date = new Date(response["Due date"]);
            rows.push(
                <TableRow key={i}>
                    <TableCell align="right">{response.id}</TableCell>
                    <TableCell align="right">{response.Name}</TableCell>
                    <TableCell align="right">{response.Email}</TableCell>
                    <TableCell align="right">{response.Summary}</TableCell>
                    <TableCell align="right">{response['Location of problem']}</TableCell>
                    <TableCell align="right">{response.Type}</TableCell>
                    <TableCell align="right">{response.Priority}</TableCell>
                    <TableCell align="right" component="th" scope="row">
                        {date.toDateString() + ' : ' + date.toLocaleTimeString()}
                    </TableCell>
                    <TableCell align="right">{response['More Details']}</TableCell>
                </TableRow>
            )
        }

        return(<TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Summary</TableCell>
                    <TableCell align="right">Location of Problem</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Priority</TableCell>
                    <TableCell align="right">Due Date</TableCell>
                    <TableCell align="right">More Details</TableCell>
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
            </div>
        );
    }
}
