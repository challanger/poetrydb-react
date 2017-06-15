import React from 'react';
import ReactDOM from 'react-dom';
import './css/header.css';

class Header extends React.Component {
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
        </div> 
      </header> 
    );
  }
}

export default Header;
