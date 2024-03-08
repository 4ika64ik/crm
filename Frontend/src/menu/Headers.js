import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="menu">
      <button className="menu-button" onClick={handleMenuClick}>
        Menu
      </button>
      {showMenu && (
        <ul className="menu-items">
          <Link to="/">Главная</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contact">Контакты</Link>
        </ul>
      )}
    </div>
  );
};

export default Menu;
