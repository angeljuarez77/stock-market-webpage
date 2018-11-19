import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import OpeningView from './components/OpeningView/OpeningView';
import RangePick from './components/RangePick/RangePick';
import GraphView from './components/GraphView/GraphView';

const Company = class {
  constructor(name, img, symbol) {
    this.name = name;
    this.logo = img;
    this.symbol = symbol;
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      view : '',
      range : '',
      symbol: '',
      name: '',
      rangeInfo : [],
      companies : [
      new Company('Walmart', "https://storage.googleapis.com/iex/api/logos/WMT.png", 'WMT'),
      new Company('Exxon Mobil', "https://storage.googleapis.com/iex/api/logos/XOM.png", 'XOM'),
      new Company('Berkshire Hathaway',"https://storage.googleapis.com/iex/api/logos/BRK.A.png", 'BRK.A'),
      new Company('Apple',"https://storage.googleapis.com/iex/api/logos/AAPL.png", 'AAPL'),
      new Company('UnitedHealth Group',"https://storage.googleapis.com/iex/api/logos/UNH.png", 'UNH'),
      new Company('McKesson', "https://storage.googleapis.com/iex/api/logos/MCK.png",'MCK'),
      new Company('CVS Health', "https://storage.googleapis.com/iex/api/logos/CVS.png", 'CVS'),
      new Company('Amazon', "https://storage.googleapis.com/iex/api/logos/AMZN.png",'AMZN'),
      new Company('AT&T', "https://storage.googleapis.com/iex/api/logos/T.png",'T'),
      new Company('General Motors', "https://storage.googleapis.com/iex/api/logos/GM.png", 'GM'),
      new Company('Ford Motor', "https://storage.googleapis.com/iex/api/logos/F.png", 'F')
      ]
    } 
    this.grabId = this.grabId.bind(this);
    this.homeClick = this.homeClick.bind(this);
    this.radioClick = this.radioClick.bind(this);
    this.submitAll = this.submitAll.bind(this);
  }

  conditionalView(view){
    switch(view){
      case 'opening':
      return <OpeningView grabId={this.grabId} allInfo={this.state}/>
      case 'range':
      return <RangePick onClick={this.homeClick} onRadioClick={this.radioClick} submitAll={this.submitAll}/>
      case 'graph':
      return <GraphView homeView={this.homeClick} stockInfo={this.state.rangeInfo} range={this.state.range} symbol={this.state.symbol} name={this.state.name}/> 
      default: 
      return <OpeningView grabId={this.grabId} allInfo={this.state}/>
    }
  }

  radioClick(e){
    e.preventDefault();
    const range = e.target.id;
    this.setState({
      range : range
    })
  }

  submitAll(e){
    e.preventDefault();
    const view = e.target.id;
    this.setState({
      view : view
    })
    const symbol = this.state.symbol;
    const range = this.state.range;
    const axiosCall = () => { 
      axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`)
      .then(
        res => {
          this.setState({
            rangeInfo : res.data
          })
        }
      ).catch(err => console.log(err))
    }
    axiosCall()
  }  

  homeClick(e){
    const home = e.target.id;
    this.setState({
      view : home
    })
  }

  grabId(e){
    const company = e.target.id;
    const name = e.target.name;
    const view = e.target.getAttribute('data-view');
    this.setState({
      symbol : company,
      view : view,
      name : name
    })
  }

  render() {
    return (
      <div className="App">
        {this.conditionalView(this.state.view)}
      </div>
    );
  }
}

export default App;
