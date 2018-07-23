import React, { Component } from 'react';
import { render } from 'react-dom';

class Home extends Component {
  state = {
    text: 'Home Page'
  };

  render() {
    console.log('home page');
    return <div>{this.state.text}</div>;
  }
}

render(<Home />, document.getElementById('app'));
