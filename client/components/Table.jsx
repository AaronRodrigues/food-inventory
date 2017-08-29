import React, {Component} from 'react';
import TableRow from './TableRow.jsx';
import TableHead from './TableHead.jsx';

export default class Table extends Component {
  render() {
    const {data, onClick, onDelete} = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <TableHead/>
          {
            data.map(row => (
              <TableRow 
                key={row._id} 
                row={row} 
                onClick={onClick}
                onDelete={onDelete}
              />
            ))
          }
        </table>
      </div>
    )
  }
}