import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    const {onClick, className, children} = this.props;
    const defaultClass = "btn btn-outline-primary btn-sm "
    return (
      <button
        className={defaultClass + className}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}