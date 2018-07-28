import React, { Component } from 'react';
import { render } from 'react-dom';

class About extends Component {
  state = {
    text: 'About Page'
  };

  render() {
    console.log('about page');
    return <div>{this.state.text}</div>;
  }
}

render(<About />, document.getElementById('app'));
