import React, { Component } from "react";
import { render } from "react-dom";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect } from "react-router-dom"
// import HomePage2 from "./HomePage2";
import HomePage from "./HomePage";


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/> 
                 {/*<Route exact path="/" component={HomePage2}/>*/}
                
            </Switch>
        </Router>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);