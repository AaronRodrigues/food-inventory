import React, {Component} from 'react';
import Button from './Button.jsx';

export default class TableRow extends Component {
  render() {
    const {row, onClick, onDelete} = this.props;
    return (
      <tbody>
        <tr>
          <td>{row.name}</td>
          <td>{row.location}</td>
          <td>
            <span>
              <Button 
                onClick={() => onClick('decrease', row._id)}
                className="minusBtn"
              >-</Button>
            </span>
            {row.num_of_items}
            <span>
              <Button 
                onClick={() => onClick('increase', row._id)}
                className="plusBtn"
              >+</Button>
            </span>
          </td>
          <td>{row.type}</td>
          <td>
            <span>
              <Button
                onClick={() => onDelete(row._id)}
                className="btn-outline-danger"
              >Delete</Button>
            </span>
          </td>
        </tr>
      </tbody>
    )
  }
}