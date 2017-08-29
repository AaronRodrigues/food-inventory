import React, {Component} from 'react';

export default class Input extends Component {
  render() {
    const {onSubmit} = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button type="submit">Add</button>
      </form>
    )
  }
}