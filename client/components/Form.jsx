import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    const {children, className, onSubmit} = this.props;
    return (
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    )
  }
}