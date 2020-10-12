import React from 'react';
import './App.css';
import List from './components/List'
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginView from './components/LoginView';
import ExampleProtectedView from './components/ExampleProtectedView';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './components/Auth';
import Search from './components/Search'
import Start from './components/Start';
import Digit from './components/Digit';
import Register from './components/Register';
import MapContainer from './components/MapContainer';
import Titles from './components/Titles';
import axios from 'axios';
import constants from './constants.json';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={plug:[],
                      textInput: "",
                      plugVerify: null,
                      isAuthenticated: false,
                      someData: null,
                      marker:null,
                      money:0,
                      centerLat:65.01236,centerLng:25.46816,
                      searchPlug:[],
                      second:0,minutes:0,hour:0
    }
  }
  componentDidMount = () =>
  {
    axios.get(constants.baseAddress + '/pluggers').then(result => {
      this.setState({ plug: result.data.pluggers });
    })
    .catch(error => {
      console.error(error);
    })
  }

  onLogin = () => {
    this.setState({ isAuthenticated: true })
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  }

  /* This function illustrates how some protected API could be accessed */
  loadProtectedData = () => {
    axios.get(constants.baseAddress + '/hello-protected', Auth.getAxiosAuth()).then(results => {
      this.setState({ someData: results.data });
    })
  }

  register = (event)=>
  {
    event.preventDefault();
    console.log('post');
    axios.post(constants.baseAddress +'/users', {
    username: event.target['username'].value,
    password: event.target['password'].value
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  newInput = (event)=>{
    this.setState({textInput: event.target.value });
    console.log(event.target.value);
    console.log(this.state.marker);
  }
  choosePlug = (event) =>
  {
    event.preventDefault();
    console.log(event.target['digit'].value);
    let b = this.state.plug.filter(i=>i.digit === event.target['digit'].value);
    console.log(b);
    if(b.length != 0)
    {
      this.setState({plugVerify : b[0]});
      console.log('try again');
    }
    else
    {
       this.setState({plugVerify:null});
    }
  }
  start = () =>
  {
    var _this=this;
    this.incrementer = setInterval(function(){
      _this.setState({second:(_this.state.second + 1)});
    },1000);
  }
  stop = () =>
  {
    clearInterval(this.incrementer);
    let money;
    let d = this.state.plugVerify;
    if(d.type === 'slow')
    {
      if(d.free === 'yes')
      {
        money = 0;
      }
      else
      {
        money =  0.2 * this.state.second/60 ;
      }
    }
    else if(d.type === 'fast')
    {
      money= 0.18 * this.state.second/3600 * this.state.plugVerify.electricity
    }
    this.setState({money:money});
  }
  show_plug = (id)=>
  {
    let marker = this.state.plug.find(i=> i.id===id);
    this.setState({marker:marker});
    console.log(id);
    console.log(this.state.marker);
    this.setState({centerLat:marker.lat});
    this.setState({centerLng:marker.lng});
    console.log(this.state.centerLat);
  }
  search = ()=>
  {
    let searchPlug = this.state.plug.filter(i=>i.name.toUpperCase().includes(this.state.textInput.toUpperCase()))
    this.setState({searchPlug:searchPlug});
    this.setState({marker:null});
 }
 logout = ()=>
 {
   this.setState({isAuthenticated:false});
 }

  render() {

    return (
      <Router>
        <Titles />
        <Route path="/" exact render={ routeProps => <List isAuthenticated ={this.state.isAuthenticated} searchPlug={this.state.searchPlug} search={this.search} plug={this.state.plug} show_plug={this.show_plug}
                                                centerLat={this.state.centerLat} centerLng={this.state.centerLng} marker={this.state.marker} newInput={this.newInput} textInput={this.state.textInput} logout={this.logout} {...routeProps}/> }/>
        <Route path="/search" exact render={ routeProps => <Search {...routeProps}/> }/>
        <Route path="/start" exact render={ routeProps => <Start isAuthenticated ={this.state.isAuthenticated} start={this.start} second={this.state.second} stop={this.stop} money={this.state.money} plugVerify={this.state.plugVerify}  {...routeProps}/> }/>
        <Route path="/digit" exact render={ routeProps => <Digit isAuthenticated ={this.state.isAuthenticated} choosePlug={this.choosePlug} {...routeProps}/> }/>
        <Route path="/register" exact render={ routeProps => <Register register={this.register} {...routeProps}/> }/>
        <Route path="/login" exact render={
                  (routeProps) =>
            <LoginView
              loginSuccess = { this.onLogin }
              loginFail = { this.onLoginFail }
              userInfo={ this.state.userInfo }
              redirectPathOnSuccess="/"
              {...routeProps}
              />
        } />
        <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/example" exact render={
            (routeProps) =>
              <ExampleProtectedView
                loadProtectedData={ this.loadProtectedData }
                someData={ this.state.someData }
                />
          }>          
        </ProtectedRoute>
        </Router>
    )
  }
}
export default App;