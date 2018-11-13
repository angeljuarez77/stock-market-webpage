import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  componentDidMount(){
    axios.get('https://api.iextrading.com/1.0/stock/aapl/chart/dynamic')
    .then(
      res => {
        console.log(res.data)
      }
    ).catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1 className="logo">Stock Market Web Page</h1>
      </div>
    );
  }
}

export default App;
