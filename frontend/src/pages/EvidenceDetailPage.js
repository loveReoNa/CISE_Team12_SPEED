import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EvidenceDetailPage.css';

const EvidenceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvidenceDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/evidence/${id}`);
        setEvidence(response.data.data);
      } catch (err) {
        setError('获取证据详情失败，请检查后端服务是否运行');
        console.error('Error fetching evidence detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidenceDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="evidence-detail-page">
        <div className="loading">正在加载证据详情...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="evidence-detail-page">
        <div className="error-message">{error}</div>
        <Link to="/search" className="back-button">返回搜索结果</Link>
      </div>
    );
  }

  if (!evidence) {
    return (
      <div className="evidence-detail-page">
        <div className="not-found">
          <h2>证据未找到</h2>
          <p>请求的证据不存在或已被移除。</p>
          <Link to="/search" className="back-button">返回搜索结果</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="evidence-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← 返回
      </button>

      <article className="evidence-detail">
        <header className="evidence-header">
          <h1>{evidence.title}</h1>
          <div className="evidence-meta">
            <span className="author">作者: {evidence.author}</span>
            <span className="year">发表年份: {evidence.publicationYear}</span>
          </div>
        </header>

        <section className="evidence-content">
          <div className="section">
            <h2>摘要</h2>
            <p className="abstract">{evidence.abstract}</p>
          </div>

          <div className="section">
            <h2>研究方法</h2>
            <p className="methods">{evidence.methods}</p>
          </div>

          <div className="section">
            <h2>研究结论</h2>
            <p className="conclusions">{evidence.conclusions}</p>
          </div>

          <div className="section">
            <h2>关键词</h2>
            <div className="keywords">
              {evidence.keywords.map(keyword => (
                <span key={keyword} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        <footer className="evidence-footer">
          <p>证据ID: {evidence.id}</p>
        </footer>
      </article>
    </div>
  );
};

export default EvidenceDetailPage;