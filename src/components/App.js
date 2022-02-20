import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Diary from './Diary';
import Tips from './Tips';
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import './styles/App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  render(){
    return (
    <BrowserRouter>
      <Header />
      <main className="content">
        {this.state.loggedIn && <NavBar />}
        <Switch>
          <ProtectedRoute path="/diary" loggedIn={this.state.loggedIn} component={Diary} />
          <ProtectedRoute path="/tips" loggedIn={this.state.loggedIn} component={Tips} />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/diary" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
  }
}

export default App;
