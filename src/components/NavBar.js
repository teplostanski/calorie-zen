import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar() {
  return (
    <nav className="menu">
      <NavLink exact className="menu__item" activeClassName="menu__item_active" to="/diary">Дневник</NavLink>
      <NavLink className="menu__item" activeClassName="menu__item_active" to="/tips">Советы</NavLink>
    </nav>
  );
}

export default NavBar;