import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <header> 
        <div class="row">
          <div class="columns small-12 medium-4 logo">Logo</div> 
          <div class="columns small-12 medium-8 menu">
            <ul> 
              <li><a href="/">Home</a></li>
              <li><a target="_blank" href="http://poetrydb.org/index.html">PoetryDB</a></li>
              <li><a href="#">About</a></li>
            </ul> 
          </div> 
      </header> 
    );
  }
}

export default App;
