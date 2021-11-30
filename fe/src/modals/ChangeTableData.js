import React from 'react'
import './ChangeTableData.scss'

export class DataForm extends React.Component{
    constructor(props, tableId){
        super(props);

        this.tableId = tableId;

        this.getTableInfo = this.getTableInfo.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.previewChanges = this.previewChanges.bind(this);
        this.submit = this.submit.bind(this);

        this.table = JSON.parse(this.getTableInfo(tableId));
    }

    getTableInfo(tableId){
        const url = "http://localhost:8080/table/" + tableId;
        const response = fetch(url);
        return response;
    }

    changeCompany(event){
        this.setState({value: event.target.value});
    }

    previewChanges(){
        return (
            <div id = "formB">
                <form onSubmit = {this.submit}>
                    <label>
                        Company Name:
                        <textarea id = "companyName" name = {this.table.company} rows = {1} cols = {50} />
                    </label>
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
                        <input type = "text" value = {this.table.company} onChange = {this.changeCompany} />
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