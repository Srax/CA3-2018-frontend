import React, { Component } from "react";
import facade from "./apiFacade";
import { HashRouter as Router, Route, Switch, NavLink } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  render() {
    return (
      <div id="loginBox" className="absolute-center">
        <h3 className="text-center mb-4">Login</h3>
        <form
          className="text-center"
          onSubmit={this.login}
          onChange={this.onChange}
        >
          <div className="form-group mb-4">
            <input
              className="form-control text-center"
              type="text"
              id="username"
              placeholder="username"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control text-center"
              type="password"
              id="password"
              placeholder="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res }));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}

const NavMenu = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/loginpage">
            Login Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const Welcome = ({ match }) => {
  return (
    <div>
      <h1>Welcome to CA3</h1>
      <p>
        Click the <NavLink to="/loginPage">Login</NavLink> link to login
      </p>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  };
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  };

  render() {
    return (
      <Router>
        <Switch>
          <div>
            <NavMenu />
            <div className="container-fluid">
              <Route exact path="/" render={() => <div><Welcome/></div>} />
              <Route path="/loginpage" render={() => <div>
                {!this.state.loggedIn ? (
                <LogIn login={this.login} />
              ) : (
                <div>
                  <LoggedIn />
                  <button onClick={this.logout}>Logout</button>
                </div>
              )}
              </div>}/>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
