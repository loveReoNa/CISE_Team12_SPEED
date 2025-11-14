import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadEvidence.css';

const UploadEvidence = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    publicationYear: new Date().getFullYear(),
    keywords: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('请先登录');
      setLoading(false);
      return;
    }

    try {
      const keywordsArray = formData.keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);
      
      await axios.post('http://localhost:3000/api/evidence/upload', {
        title: formData.title,
        author: formData.author,
        abstract: formData.abstract,
        publicationYear: parseInt(formData.publicationYear),
        keywords: keywordsArray
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('证据数据上传成功！');
      setFormData({
        title: '',
        author: '',
        abstract: '',
        publicationYear: new Date().getFullYear(),
        keywords: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || '上传失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>上传证据数据</h2>
        <button onClick={handleLogout} className="logout-btn">退出登录</button>
      </div>
      
      <div className="upload-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>标题:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="输入证据标题"
            />
          </div>
          
          <div className="form-group">
            <label>作者:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="输入作者姓名"
            />
          </div>
          
          <div className="form-group">
            <label>发表年份:</label>
            <input
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          
          <div className="form-group">
            <label>关键词:</label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="用逗号分隔多个关键词"
            />
            <small>例如：敏捷开发, 软件质量, 实证研究</small>
          </div>
          
          <div className="form-group">
            <label>摘要:</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
              rows="6"
              placeholder="输入证据摘要"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? '上传中...' : '上传证据'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadEvidence;