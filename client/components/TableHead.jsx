import React, {Component} from 'react';

export default class TableHead extends Component {
  render() {
    return (
      <tbody>
        <tr>
          <th className="tableHead">Name</th>
          <th className="tableHead">Location</th>
          <th className="tableHead">Number Of Items</th>
          <th className="tableHead">Type</th>
        </tr>
      </tbody>
    )
  }
}