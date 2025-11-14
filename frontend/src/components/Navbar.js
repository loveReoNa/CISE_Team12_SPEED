import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">SPEED</Link>
      </div>
      <ul className="navbar-nav">
        <li><Link to="/">首页</Link></li>
        <li><Link to="/search">搜索证据</Link></li>
        {isAuthenticated && <li><Link to="/upload">上传证据</Link></li>}
        <li><Link to="/about">关于</Link></li>
      </ul>
      <div className="navbar-auth">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-btn">退出登录</button>
        ) : (
          <>
            <Link to="/login" className="auth-link">登录</Link>
            <Link to="/register" className="auth-link">注册</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;