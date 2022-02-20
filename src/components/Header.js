import React from 'react';
import headerLogo from '../images/calorieZen.png';
import './styles/Header.css';

function Header() {
  return (
    <div className="header">
      <img alt="Calorie Zen logo" className="header__logo" src={headerLogo} />
      <h1 className="header__header">Calorie-Zen</h1>
    </div>
  );
}

export default Header;
