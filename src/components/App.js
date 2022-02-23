import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Diary from './Diary';
import Tips from './Tips';
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';
import './styles/App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
  }
  componentDidMount(){
    // проверьте токен здесь
    this.handleTokenCheck();
  }
  
  handleTokenCheck(){
    // проверьте, есть ли jwt токен в локальном хранилище браузера
    // если это так, возьмите этот токен и создайте переменную jwt
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена 
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      // проверим токен
      // вызовите метод auth.checkToken(), передающий этот токен
      // внутри следующего then(), если там есть объект res,
      // установите loggedIn значение true
      auth.getContent(jwt).then((res) => {
        if (res){
          // здесь можем получить данные пользователя!
          const userData = {
            username: res.username,
            email: res.email
          }
          // поместим их в стейт внутри App.js
          // в колбэке this.setState перенаправьте пользователя в /diary
          this.setState({
            loggedIn: true,
            userData
          }, () => {
            this.props.history.push("/diary");
          });
        }
      }); 
    }
  } 
  
  
  handleLogin (){
    this.setState({
      loggedIn: true
    })
  }
  render(){
    return (
      <>
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
            <Login handleLogin={this.handleLogin} />
          </Route>
          <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/diary" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
      </>
  );
  }
}

export default withRouter(App);
