import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>关于 SPEED</h1>
      <div className="about-content">
        <section className="project-info">
          <h2>项目介绍</h2>
          <p>
            SPEED（软件实践实证证据数据库）是一个基于证据的软件工程实践研究平台。
            我们的目标是收集、整理和展示软件工程领域的实证研究证据，帮助开发者和研究者
            做出基于科学证据的决策。
          </p>
        </section>

        <section className="features-list">
          <h2>主要功能</h2>
          <ul>
            <li>搜索和浏览软件工程实践证据</li>
            <li>基于关键词、年份和主题的智能过滤</li>
            <li>详细的证据信息展示</li>
            <li>响应式设计，支持移动和桌面设备</li>
          </ul>
        </section>

        <section className="technology-stack">
          <h2>技术栈</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>前端</h3>
              <ul>
                <li>React 19</li>
                <li>React Router</li>
                <li>Axios</li>
                <li>CSS3</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>后端</h3>
              <ul>
                <li>NestJS</li>
                <li>TypeScript</li>
                <li>RESTful API</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="contact-info">
          <h2>联系我们</h2>
          <p>
            如果您有任何问题或建议，请通过以下方式联系我们：
            <br />
            邮箱: contact@speed-project.org
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;