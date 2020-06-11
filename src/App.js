import React from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import ShowErrors from './ShowErrors';


class App extends React.Component{

  constructor(){
    super();
    this.state = {
      firstname: '',
      lastname: '',
      id: '',
      submitted: false,

      columnDefs: [
        {headerName: 'First Name', field: 'firstname', sortable: true, filter: true, checkboxSelection: true},
        {headerName: 'LastName', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Id', field: 'id', sortable: true, filter: true}
      ],
      rowData: this.createRowData(),
      // rowData: [
      //   {make: 'Toyota', model:'celica', price: 35000},
      //   {make: 'Ford', model:'Mondeo', price: 35000},
      //   {make: 'Porsche', model:'Boxter', price: 35000}
      // ]
    }

    
  }

  validations = {
    firstname: {
        required: true,
        minlength: { requiredLength: 5 }
    }
  };

  createRowData() {
    var rowData = [];
    for (var i = 0; i < 1000; i++) {
        // create sample row item
        var rowItem = {
            // is is simple
            firstname: 'aa' + Math.floor(Math.random() * 10000),
            lastname: 'bb' + Math.floor(Math.random() * 10000),
            id:  Math.floor(Math.random() * 10000),
            
        };
        rowData.push(rowItem);
    }
    return rowData;
}

  add = () => {
    if(document.getElementById('firstname').value !== "" && document.getElementById('firstname').value.length>=5){
      this.state.rowData.splice(0,0,{firstname: document.getElementById('firstname').value, lastname: document.getElementById('lastname').value, id: document.getElementById('id').value});
      this.gridApi.setRowData(this.state.rowData);
      this.setState({ firstname: '' }); 
      this.setState({ lastname: '' }); 
      this.setState({ id: '' }); 
      this.gridApi.paginationGoToFirstPage();
      this.setState({submitted:false});
    }else{
      this.setState({submitted:true});
    }
  }

  delete = () => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    let firstname = selectedData.map(node => node.firstname);

    this.setState({rowData : this.state.rowData.filter(node => node.firstname!==`${firstname}`)});
    this.gridApi.setRowData(this.state.rowData);
  }

  onFilterTextBoxChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById('filter-text-box').value);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.setState({submitted:true});
  }

  render(){
    return(
      <div>
        <div>
        <label>First Name : </label>
          <input
            value={this.state.firstname || ''}
            id = "firstname"
            name="firstname"
            type="text"
            className="form-control"
            onChange={this.handleInputChange} 
          />
          
          <label>Last Name : </label>
          <input
            value={this.state.lastname || ''}
            id = "lastname"
            name="lastname"
            type="text"
            className="form-control"
            onChange={this.handleInputChange} 
          />
        <label>Id : </label>
          <input
            value={this.state.id || ''}
            id = "id"
            name="id"
            type="number"
            className="form-control"
            onChange={this.handleInputChange} 
          />
        </div>
        <div>
          <ShowErrors value={this.state.firstname} validations={this.validations.firstname} display={this.state.submitted} />
        </div>
        <br/>
        <div>
          <button id="add_btn" onClick={this.add}>Add</button>
          <button id="del_btn" onClick={this.delete}>Delete</button>
        </div>

        <br/>
            <br/>
          <input type="text" id="filter-text-box" placeholder="Search..." onInput={this.onFilterTextBoxChanged}/>
          <div className = "ag-theme-balham"
            style={{
              width:600, 
              height: 600
            }}>
          <AgGridReact
            columnDefs = {this.state.columnDefs}
            rowData = {this.state.rowData}
            rowSelection = "single"
            paginationAutoPageSize = "true"
            pagination = "true"
            onGridReady = {params => this.gridApi = params.api}
          />
        </div>
      </div>
    )
  }

}

export default App;
