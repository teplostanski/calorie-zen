import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';
import './styles/Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      calGoal: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword){
      auth.register(this.state.username, this.state.password, this.state.email).then((res) => {
        if(res.statusCode !== 400){
          this.props.history.push('/login');
        }
      });
    }
  }
  render(){
    return (
      <div className="register">
        <p className="register__welcome">
            Пожалуйста, зарегистрируйтесь.
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label htmlFor="username">
            Логин:
          </label>
          <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <label htmlFor="confirmPassword">
            Повторите пароль:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
          <label htmlFor="calGoal">
            Калории за день:
          </label>
          <input id="calGoal" name="calGoal" type="number" value={this.state.calGoal} onChange={this.handleChange} />
          <div className="register__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться</button>
          </div>
        </form>

        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
        </div>
        </div>
  );
  }

}

export default withRouter(Register);
