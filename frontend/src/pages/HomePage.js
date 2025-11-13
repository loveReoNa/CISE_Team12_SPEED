import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>欢迎使用 SPEED</h1>
        <p>软件实践实证证据数据库</p>
        <p>探索基于证据的软件工程实践研究</p>
        <Link to="/search" className="cta-button">开始搜索证据</Link>
      </section>
      <section className="features">
        <h2>功能特性</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>搜索证据</h3>
            <p>通过关键词、年份和主题过滤搜索软件工程实践证据。</p>
          </div>
          <div className="feature-card">
            <h3>浏览详情</h3>
            <p>查看证据的完整信息，包括方法、结论和摘要。</p>
          </div>
          <div className="feature-card">
            <h3>响应式设计</h3>
            <p>在手机和桌面设备上都能获得良好的体验。</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;