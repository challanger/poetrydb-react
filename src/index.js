import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import App from './header.js';
//import registerServiceWorker from './registerServiceWorker';
import './css/style.css'; 

class Header extends React.Component {
    constructor() {
        super(); 
        this.state = {

        }; 

        this.handleShowContent = this.handleShowContent.bind(this); 
    }

    handleShowContent(event){
        alert("content to come");
        event.preventDefault(); 
    }

    render() {
        return (
        <header> 
            <div className="row">
            <div className="columns small-12 medium-4 logo">PoetryDB</div> 
            <div className="columns small-12 medium-8 menu">
                <ul> 
                <li><a target="_blank" rel="noopener noreferrer" href="http://poetrydb.org/index.html">PoetryDB</a></li>
                <li><a href="#" onClick={this.handleShowContent}>About</a></li>
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
            filter:'title',
            results: [],
            resultsPage:[],
            pageNumber:0 
        };
        this.numberPerPage=10; 
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this); 
        this.handleResultsForwards = this.handleResultsForwards.bind(this); 
        this.handleResultsBack = this.handleResultsBack.bind(this); 
    }

    handleInputChange(event){
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 

        this.setState({
            [name]: value 
        });
    }

    loadPage(){
        if(this.state.pageNumber > this.state.results.length / this.numberPerPage)
            this.setState({ pageNumber: Math.floor(this.state.results.length / this.numberPerPage)});

        let minIndex = this.state.pageNumber * this.numberPerPage; 
        let maxIndex = (this.state.pageNumber + 1) * this.numberPerPage; 
        this.setState({
            resultsPage: this.state.results.filter((elm,index,arr) => ((index >=minIndex) && (index <maxIndex)))
        }); 
    }

    handleSearch(event){
        if(this.state.search !== "")
        {
            this.setState({
                results:[],
                resultsPage:[] 
            }); 
            
            let query = this.state.filter + "/" + encodeURI(this.state.search); 

            if(this.state.filter === "linecount")
                query = query + ":abs"; 
                
            query = query + "/all";

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
                                results:res.data,
                                pageNumber: 0
                            },() => {this.loadPage()}); 
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

    pageIncrement(inc){
        this.setState((prevState,props) => {
            let temp = prevState.pageNumber + inc; 
            if(temp > -1)
            {
                if(temp > Math.floor(this.state.results.length / this.numberPerPage))
                    temp = Math.floor(this.state.results.length / this.numberPerPage); 
            }
            else 
            {
                temp = 0; 
            }
            return ({
                pageNumber:temp
            }); 
        },() => { this.loadPage() });
    }

    handleResultsForwards(){
        this.pageIncrement(1);
    }

    handleResultsBack(){
        this.pageIncrement(-1);
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
                            <option value="author">Author</option>
                            <option value="lines">Lines</option>
                            <option value="title">Title</option>
                            <option value="linecount">Line Count</option>
                        </select> 
                    </div>
                    <div className="columns medium-2">
                        <button id="searchButton" className="button" onClick={this.handleSearch}>Search</button> 
                    </div> 
                </div>
                <div className="row results">
                    {this.state.resultsPage.map((result,key) =>
                        <SearchResult result={result} key={(result.author + result.title + key).toString()}/>
                    )}
                     
                </div>
                <div className="row searchPages">
                    <div className="outer">
                        <div className="button leftArrow" onClick={this.handleResultsBack}>&lt;</div> 
                        <div className="pageNumber">{(this.state.pageNumber + 1)}</div> 
                        <div className="button rightArrow" onClick={this.handleResultsForwards}>&gt;</div>  
                    </div> 
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
