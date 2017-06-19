import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
              <li><a target="_blank" rel="noopener noreferrer" href="http://poetrydb.org/index.html">PoetryDB</a></li>
              <li><a href="/about/">About</a></li>
            </ul> 
          </div> 
        </div> 
      </header> 
    );
  }
}

class MainContent extends React.Component {
    constructor() {
        super(); 
        this.state = {
            search:'',
            filter:'all',
            results: [] 
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this); 
    }

    handleInputChange(event){
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 

        this.setState({
            [name]: value 
        });
    }

    handleSearch(event){
        console.log(this.state); 
        if(this.state.search !== "")
        {
            this.setState({
                results:[] 
            }); 
            
            let query = ""; 
            if(this.state.filter !== "all")
                query = this.state.filter + "/"; 
            query = query + encodeURI(this.state.search) + "/all";

            axios({
                    url: query,
                    baseURL: 'https://thundercomb-poetry-db-v1.p.mashape.com/',
                    headers:{
                        'X-Mashape-Key':'OFJ4HR3QkYmshm0OQjIYaY0TyRV4p1aIEwfjsnoJUu0VCRAjwZ'
                    }
                })
                .then(res => {
                    if(res.status === 200)
                    {
                        if((typeof(res.data.status) !== "undefined"))
                        {
                            alert(res.data.reason);   
                        }
                        else 
                        {
                            this.setState({
                                results:res.data 
                            }); 
                        }
                    }
                    else 
                        alert("failed to load your results"); 
                })
                .catch(err =>{
                    console.log(err);  
                    //console.log("Responce Failed: "+ textStatus); 
                });

        }
         
        
    }

    render() {
        return (
            <div className="main">
                <div className="row search">
                    <div className="columns small-offset-1 medium-6 search">
                        <input type="text" placeholder="Seach..." name="search" id="search" value={this.state.search} onChange={this.handleInputChange}/>
                    </div>
                    <div className="columns medium-2 filter">
                        <select id="filter" name="filter" value={this.state.filter} onChange={this.handleInputChange}>
                            <option value="all">All</option> 
                            <option value="author">Author</option>
                            <option value="lines">Lines</option>
                            <option value="title">Title</option>
                            <option value="line-count">Line Count</option>
                        </select> 
                    </div>
                    <div className="columns medium-2">
                        <button id="searchButton" className="button" onClick={this.handleSearch}>Search</button> 
                    </div> 
                </div>
                <div className="row results">
                    {this.state.results.map((result,key) =>
                        <SearchResult result={result} key={(result.author + result.title + key).toString()}/>
                    )}
                     
                </div>  
            </div> 
        );
    }
}

class SearchResult extends React.Component {
    render() {
        return (
            <div className="columns medium-6 medium-offset-2 item">
                <div className="inner">
                    <div className="title">{this.props.result.title}</div> 
                    <div className="author">{this.props.result.author}</div> 
                    <div className="body">
                        {this.props.result.lines.map((line,key) =>
                          <SearchResultLine line={line} index={key} key={key.toString()}/>  
                        )}
                    </div> 
                </div> 
            </div> 
        );
    }
}

class SearchResultLine extends React.Component {
    render() {
        return (
            <div className="line"><span className="lineNumber">{this.props.index + 1}</span>{this.props.line}</div> 
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
