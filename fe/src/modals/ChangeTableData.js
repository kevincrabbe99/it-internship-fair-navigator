import React from 'react'
import './ChangeTableData.scss'

export class DataForm extends React.Component{
    constructor(props, tableId){
        super(props);

        this.tableId = tableId;

        this.getTableInfo = this.getTableInfo.bind(this);
        this.change = this.change.bind(this);
        this.previewChanges = this.previewChanges.bind(this);
        this.submit = this.submit.bind(this);

        this.table = JSON.parse(this.getTableInfo(tableId));
        this.company = JSON.parse(this.table.company)
    }

    getTableInfo(tableId){
        const url = "http://localhost:8080/table/" + tableId;
        const response = fetch(url);
        return response;
    }

    change(event){
        this.setState({value: event.target.value});
    }

    previewChanges(){
        return (
            <div id = "formB">
                <form onSubmit = {this.submit}>
                    <label>
                        Company Name:
                        <textarea id = "companyName" name = {this.company._name} rows = {1} cols = {50} />
                    </label>
                    <br />
                    <label>
                        Number of Representatives:
                        <textarea id = "numberOfReps" name = {this.company._number_of_reps} rows = {1} cols = {50} />
                    </label>
                    <br />
                    <label>
                        Company Website:
                        <textarea id = "companyWebsite" name = {this.company._website} rows = {1} cols = {50} />
                    </label>
                    <br />
                    <label>
                        Notes:
                        <textarea id = "notes" name = {this.company._other_info} rows = {1} cols = {50} />
                    </label>
                    <br />
                    <input type = "button" value = {"Edit"} onClick = {this.render} />
                    <input type = "submit" value = "Submit" />
                </form>
            </div>
        )
    }

    submit(){
        const url = "http://localhost:8080/table/update/" + this.tableId + "/" + this.table.number + "/" + this.table.company + "/" + this.table.marked;
        const response = fetch(url);
        return response;
    }
    
    render(){     
        // FORM TO BASE ADD TABLE OFF OF
        return (
            <div id = "formA">
                <form onSubmit = {this.submit}>
                    <label>
                        Company Name:
                        <input type = "text" value = {this.company._name} onChange = {this.change} />
                    </label>
                    <br />
                    <label>
                        Number of Representatives:
                        <input type = "text" value = {this.company._number_of_reps} onChange = {this.change} />
                    </label>
                    <br />
                    <label>
                        Company Website:
                        <input type = "text" value = {this.company._website} onChange = {this.change} />
                    </label>
                    <br />
                    <label>
                        Notes:
                        <input type = "text" value = {this.company._other_info} onChange = {this.change} />
                    </label>
                    <br />
                    <label>
                        Company Logo:
                        <input type = "file" />
                    </label>
                    <input type = "button" value = {"Preview Changes"} onClick = {this.previewChanges} />
                    <input type = "submit" value = "Submit" />
                </form>
            </div>
        )
    }
}