import React, {Component} from 'react';
import axios from 'axios';
import '../css/App.css';
import Table from './Table.jsx';
import Input from './Input.jsx';
import FormGroup from './FormGroup.jsx';
import Form from './Form.jsx';
import Button from './Button.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      displayNewForm: false,
      name: '',
      location: '',
      num_of_items: '',
      type: ''
    }

    this.getInventory = this.getInventory.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormDisplay = this.handleFormDisplay.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  getInventory() {
    axios.get('/api/getAll')
      .then(response => {
        this.setState({result: response.data});
      })
  }

  changeAmount(type, id) {
    let newResult = this.state.result.map( item => {
      if(item._id !== id) {return item}

      let newNum = (type === 'increase') 
        ? item.num_of_items +1 
        : item.num_of_items -1;

      // Update mongoose
      axios.put('/api/put', {
        id: item._id,
        query: {num_of_items: newNum}
      });

      if (type === 'increase') {
        item.num_of_items ++;
        return item;
      }
      item.num_of_items --;
      return item;
    });

    this.setState({
      result: newResult
    });
  }

  componentDidMount() {
    this.getInventory();
  }

  /**
   * React doesn't know when users type in form
   * elements so we implement an event handler
   * to capture changes with onChange.
   */
  handleChange(event) {
    let element = event.target.id;
    this.setState({[element]: event.target.value})
  }

  handleFormDisplay() {
    let newState = !this.state.displayNewForm 
    this.setState({displayNewForm: newState});
  }

  handleDelete(id) {
    axios.delete('/api/delete?id='+id).then( () => {
      return this.getInventory();
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const {result, name, location, num_of_items, type} = this.state;
    if (name == '' || location == '' || num_of_items == '' || type == '') {
      alert('Make sure you fill in all the fields!');
      return;
    }
    let newItem = {name, location, num_of_items, type};
    axios.post('/api/post', newItem).then( () => {
      return this.getInventory();
    });
    this.setState({name: '', location: '', num_of_items: '', type: ''});
  }

  render() {
    const {result, displayNewForm} = this.state;
    return (
      <div style={{textAlign: 'center'}}>
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-3">Welcome to your inventory!</h1>
            <hr className="display-4"/>
            <Button 
              onClick={this.handleFormDisplay}
              className="addNewBtn">
            Add New
            </Button>
            {
              displayNewForm ?
                <Form onSubmit={this.handleFormSubmit}>
                  <FormGroup 
                    type="text"
                    name="Name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <FormGroup 
                    type="text"
                    name="Location"
                    id="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    type="number"
                    name="Amount"
                    id="num_of_items"
                    value={this.state.num_of_items}
                    onChange={this.handleChange}
                  />
                  <FormGroup 
                    type="text"
                    name="Type"
                    id="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  />
                  <button className="btn">
                    Submit
                  </button>
                </Form>
              : null
            }
            </div>
          </div>
        {
          result ?
            <Table 
              data={result}
              onClick={(type, id) => this.changeAmount(type, id)}
              onDelete={(id) => this.handleDelete(id)}
            />
          : null
        } 
        </div>
    );
  }
}