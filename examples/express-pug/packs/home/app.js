import React from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
  render() {
    console.log('home page');
    return <div>home page</div>
  }
}
ReactDOM.render(<Home />, document.getElementById('app'));


