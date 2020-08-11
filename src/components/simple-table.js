import React from 'react';
import {getResponses} from '../actions/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterControl from './sub-components/filter-control';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SimpleModal from './sub-components/simple-modal';
import AssignWork from './assign-work';
import './styles/main-styles.css';


export default class ExampleTable extends React.Component{
    constructor(props) {
        super(props);
        this.email = 'Email';
        this.priority = 'Priority';
        this.summary = 'Summary';
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.KeyUp);
        this.ctrlDown = false;
        this.state = {
            responses:null,
            filters:{},
            assigneeModal:false
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

    keyDown = (event) =>{
        console.log(event);
        if(event.key === 'Control'){
            this.ctrlDown = true;
        }
        if(event.key === 'Escape'){
            this.resetSelected();
        }
    }

    KeyUp = (event) =>{;
        console.log('ctrl let go')
        if(event.key === 'Control'){
            this.ctrlDown = false;
        }
    }
    resetSelected = () => {
        //debugger;
        console.log('reset',this.state);
        if(this.state.responses){
            let responses = this.state.responses.map(resp => {
                resp.selected = false;
                return resp;
            });
    
            this.setState({
                responses
            });
        }
        
    }

    selectRow = (id) => {
        let responses = [...this.state.responses];
        for(let i = 0;i < responses.length;i ++){
            let response = responses[i];
            if(response.id === id){
                response.selected = response.selected ? false : true;
            }
            else if(response.id !== id && !this.ctrlDown){
                response.selected = false;
            }
        }

        this.setState({
            responses
        });
    }

    checkFilters = (newVal) =>{
        let responses = [...this.state.responses];
        let hiddenResp = {};
        for(let i = 0;i < responses.length;i++){
            let response = responses[i];
            let keys = Object.keys(this.state.filters);
            if(keys.length > 0){
                for(let filter in this.state.filters){
                    if(response[filter] !== this.state.filters[filter]){
                        response.hide = true;
                        hiddenResp[response.id] = true;
                    }
                    else{
                        response.hide = false;
                        break;
                    }
                }
            }
            else{
                response.hide = false;
            }
        }

        this.setState({
            responses
        });
    }

    buildAssigneeString = (assignees) => {
        let string = '';

        for(let i = 0;i < assignees.length;i++){
            string += assignees[i].name + ',';
        }

        string = string.slice(0,string.length - 1);      

        return string;
    }

    buildTable = () =>{

        let rows = [];
        
        for(let i = 0;i < this.state.responses.length;i++){
            let response = this.state.responses[i];
            if(!response.hide){
                let date = new Date(response["Due date"]);
                let assignees = response.assignees && response.assignees.length > 0 ? this.buildAssigneeString(response.assignees) : (<span>No Assignee</span>);
                rows.push(
                    <TableRow className={response.selected ? 'selected' : ''} key={i} onClick={(e) => this.selectRow(response.id)}>
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
                        <TableCell align="right">{assignees}</TableCell>
                    </TableRow>
                )
            }        
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
                    <TableCell align="right">Assignees</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
            </TableContainer>
        );
    }

    removeNullFilters = (filters) => {
        let newFilter = {};

        for(let key in filters){
            if(filters[key] || filters[key] === 0){
                newFilter[key] = filters[key];
            }
        }

        return newFilter;
    }

    handleFilterChanged = (newVal,title) => {
        console.log(newVal,title);
        let filters = JSON.parse(JSON.stringify(this.state.filters));
        filters[title] = newVal ? newVal[title] : null;
        filters = this.removeNullFilters(filters);
        this.setState({
            filters
        },() => {
            this.checkFilters(newVal);
        });
    }

    checkSelected = () => {
        if(this.state.responses && this.state.responses.length > 0){
            for(let i = 0;i < this.state.responses.length;i++){
                let response = this.state.responses[i];
                if(response.selected){
                    return true;
                }
            }
        }

        return false;
    }

    findSelected = () => {
        return this.state.responses.filter(response => response.selected);
    }

    openAssigneeModal = () => {
        console.log('open modal');
        this.setState({
            assigneeModal:true
        });
    }


    modalClosed = () => {
        this.setState({
            assigneeModal:false
        });
    }

    render(){
        //console.log(this.state);
        console.log('example table:',this.state);

        const table = this.state.responses && this.state.responses.length > 0? this.buildTable() : []; 
        const emailFilter = this.state.responses && this.state.responses.length > 0 ? (
            <FilterControl responses={this.state.responses} target={this.email} filterChanged={this.handleFilterChanged}/>
        ) : null;
        const priorityFilter = this.state.responses && this.state.responses.length > 0 ? (
            <FilterControl responses={this.state.responses} target={this.priority} filterChanged={this.handleFilterChanged}/>
            ) : null;
        const summaryFilter = this.state.responses && this.state.responses.length > 0 ? (<
            FilterControl responses={this.state.responses} target={this.summary} filterChanged={this.handleFilterChanged}/>
            ) : null;
        const assignButton = this.checkSelected() ? (
            <Button onClick={(e) => this.openAssigneeModal(e)} variant="contained">Assign Work</Button>
            ) : null;
        const selectedResponses = this.state.responses && this.state.responses.length > 0 ? this.findSelected() : [];

        return(
            <div>
                <Grid container>
                    <Grid item md={4} xs={12}>
                        {emailFilter}
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {priorityFilter}
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {summaryFilter}
                    </Grid>
                </Grid>
                {table}
                <div className="assign-container">
                    {assignButton}
                </div>
                <SimpleModal open={this.state.assigneeModal} handleClose={this.modalClosed}>
                    <AssignWork selectedWork={selectedResponses} testProp="test prop here"/>
                </SimpleModal>
            </div>
        );
    }
}
