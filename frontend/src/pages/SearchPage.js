import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // 获取所有年份用于过滤
  const years = ['2021', '2022', '2023', '2024'];
  
  // 获取所有主题用于过滤
  const topics = [
    '敏捷开发', '测试驱动开发', '持续集成', 
    '代码审查', '结对编程', 'DevOps', '软件质量'
  ];

  const searchEvidence = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (year) params.append('year', year);
      if (topic) params.append('topic', topic);

      const response = await axios.get(`http://localhost:3000/api/evidence?${params}`);
      setResults(response.data.data || []);
      setHasSearched(true);
    } catch (err) {
      setError('搜索失败，请检查后端服务是否运行');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setQuery('');
    setYear('');
    setTopic('');
    setResults([]);
    setHasSearched(false);
  };

  // 初始加载时显示所有证据
  useEffect(() => {
    searchEvidence();
  }, []);

  return (
    <div className="search-page">
      <h1>搜索证据</h1>
      <p>在软件工程实践证据数据库中搜索相关研究</p>

      <form className="search-form" onSubmit={searchEvidence}>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="输入关键词搜索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>年份:</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">全部年份</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>主题:</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">全部主题</option>
              {topics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button type="button" className="clear-button" onClick={clearFilters}>
            清除过滤
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <section className="results-section">
        <h2>搜索结果 ({results.length})</h2>
        
        {loading && <div className="loading">正在搜索证据...</div>}
        
        {!loading && hasSearched && results.length === 0 && (
          <div className="no-results">
            没有找到匹配的证据。请尝试其他搜索词或过滤条件。
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="results-list">
            {results.map(evidence => (
              <div key={evidence.id} className="evidence-card">
                <h3>
                  <Link to={`/evidence/${evidence.id}`}>
                    {evidence.title}
                  </Link>
                </h3>
                <p className="author">作者: {evidence.author}</p>
                <p className="year">发表年份: {evidence.publicationYear}</p>
                <p className="abstract">{evidence.abstract}</p>
                <div className="keywords">
                  {evidence.keywords.map(keyword => (
                    <span key={keyword} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;