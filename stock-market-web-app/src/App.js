import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import SymbolForm from './components/company-input/SymbolForm';
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
      companies : [
      new Company('Walmart', "https://storage.googleapis.com/iex/api/logos/WMT.png", '  WMT'),
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
    this.handleClick = this.handleClick.bind(this);
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
      return <GraphView homeView={this.homeClick}/> 
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
          console.log(res.data)
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

  handleClick(e){
    e.preventDefault();
  }

  grabId(e){
    const company = e.target.id;
    console.log(company);
    const view = e.target.getAttribute('data-view');
    console.log(view);
    this.setState({
      symbol : company,
      view : view
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
