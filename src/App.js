import React, { Component } from 'react';
import './App.css';

import OrderSystem from './components/OrderSystem/OrderSystem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrderSystem />
      </div>
    );
  }
}

export default App;
