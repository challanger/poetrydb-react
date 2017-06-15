import React from 'react';
import ReactDOM from 'react-dom';
//import App from './header.js';
//import registerServiceWorker from './registerServiceWorker';
import './index.css'; 

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

class MainContent extends React.Component {
    render() {
        return (
            <div class="main">
                <div class="row">
                    <div class="columns medium-6 title">
                        <h1>PoetryDB</h1>
                    </div> 
                </div>
                <div class="row">
                    <div class="columns medium-8 search"><input type="text" helper="Seach..." id="search"/></div>
                    <div class="columns medium-2 filter">
                        <select id="filter">
                            <option value="all" selected="true">All</option> 
                            <option value="author">Author</option>
                            <option value="lines">Lines</option>
                            <option value="title">Title</option>
                            <option value="line-count">Line Count</option>
                        </select> 
                    </div>
                    <div class="columns medium-2"><button id="searchButton">Search</button> </div> 
                </div>
                <div class="row results"></div>  
            </div> 
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <MainContent></MainContent>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
