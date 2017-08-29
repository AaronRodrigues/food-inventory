import React, {Component} from 'react';

export default class FormGroup extends Component {
  render() {
    const {type, name, id, value, onChange} = this.props;
    return (
      <div className="form-group">
        <label className="sr-only" htmlFor={id}>{name}: </label>
        <input 
          type={type} 
          name={name}
          placeholder={name}
          id={id}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
}