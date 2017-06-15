import React from 'react';
import ReactDOM from 'react-dom';
//import App from './header.js';
//import registerServiceWorker from './registerServiceWorker';
import './css/style.css'; 

class Header extends React.Component {
  render() {
    return (
      <header> 
        <div className="row">
          <div className="columns small-12 medium-4 logo">PoetryDB</div> 
          <div className="columns small-12 medium-8 menu">
            <ul> 
              <li><a href="/">Home</a></li>
              <li><a target="_blank" href="http://poetrydb.org/index.html">PoetryDB</a></li>
              <li><a href="/about/">About</a></li>
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
            <div className="main">
                <div className="row search">
                    <div className="columns small-offset-1 medium-6 search"><input type="text" placeholder="Seach..." id="search"/></div>
                    <div className="columns medium-2 filter">
                        <select id="filter">
                            <option value="all" selected="true">All</option> 
                            <option value="author">Author</option>
                            <option value="lines">Lines</option>
                            <option value="title">Title</option>
                            <option value="line-count">Line Count</option>
                        </select> 
                    </div>
                    <div className="columns medium-2"><button id="searchButton" className="button">Search</button> </div> 
                </div>
                <div className="row results"></div>  
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
