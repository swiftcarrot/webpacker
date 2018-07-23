import React, { Component } from 'react';
import { render } from 'react-dom';

class Home extends Component {
  state = {
    text: 'Home Page'
  };

  render() {
    console.log('home page');

    return (
      <div>
        <img src={require('./test.jpg')} />
        <div>{this.state.text}</div>
      </div>
    );
  }
}

render(<Home />, document.getElementById('app'));
