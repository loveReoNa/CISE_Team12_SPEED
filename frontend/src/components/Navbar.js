import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">SPEED</Link>
      </div>
      <ul className="navbar-nav">
        <li><Link to="/">首页</Link></li>
        <li><Link to="/search">搜索证据</Link></li>
        <li><Link to="/about">关于</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;