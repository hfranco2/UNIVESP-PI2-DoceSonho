import React, { Component } from "react";
import { render } from "react-dom";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect } from "react-router-dom"
import HomePage from "./HomePage";
import Cart from "./Cart";


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
                <Route  path="/cart/" component={Cart}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);