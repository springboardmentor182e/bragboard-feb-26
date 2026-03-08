import React, { useState, useEffect } from 'react';
import ReportedPostItem from './ReportedPostItem';
import { adminAPI } from '../../../services/api';

const ReportedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getReports();
      
      // Transform backend data to match frontend format
      const formattedPosts = response.data.map(report => ({
        id: report.id,
        author: report.content?.author || 'Unknown User',
        time: new Date(report.created_at).toLocaleString(),
        content: report.content?.content || report.title || 'No content',
        reportedBy: report.content?.reported_by || 'Anonymous',
        reason: report.content?.reason || report.type || 'Not specified',
        status: report.status || 'pending'
      }));
      
      setPosts(formattedPosts);
      setError('');
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load reports');
      
      // 🔥 FALLBACK: Agar backend se data nahi aata to dummy data dikhao
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  // Fallback dummy data (tab dikhega jab backend down ho)
  const setFallbackData = () => {
    setPosts([
      {
        id: 1,
        author: 'Alex Thompson',
        time: '2 hours ago',
        content: 'This is an amazing achievement that really shows how much effort...',
        reportedBy: 'Anonymous',
        reason: 'Inappropriate content',
        status: 'pending'
      },
      {
        id: 2,
        author: 'Sarah Chen',
        time: '5 hours ago',
        content: 'Congratulations to the entire team for hitting our quarterly goals...',
        reportedBy: 'James Wilson',
        reason: 'Spam or misleading',
        status: 'pending'
      },
      {
        id: 3,
        author: 'Marcus Johnson',
        time: '1 day ago',
        content: 'Big shout-out to everyone who contributed to the product launch...',
        reportedBy: 'Anonymous',
        reason: 'Off-topic content',
        status: 'pending'
      }
    ]);
  };

  // Handle post deletion
const handlePostDelete = async (deletedPostId) => {
  console.log('Removing post from UI:', deletedPostId);
  
  // UI se post hatao
  setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
  
  // Optional: Success message
  setMessage('Post removed from list');
  setTimeout(() => setMessage(''), 2000);
};

  // Handle post resolution
  const handlePostResolve = async (reportId) => {
    try {
      // API call to resolve
      await adminAPI.resolveReport(reportId);
      
      // Update UI
      setPosts(posts.map(post => 
        post.id === reportId 
          ? { ...post, status: 'resolved' } 
          : post
      ));
      
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Failed to resolve report');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center">Loading reports...</p>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  const pendingPosts = posts.filter(p => p.status !== 'resolved');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Reported Posts</h2>
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Total: {posts.length}
          </span>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Pending: {pendingPosts.length}
          </span>
        </div>
      </div>
      
      {/* Connection status indicator */}
      <div className="mb-3 text-xs">
        {error ? (
          <span className="text-yellow-600">⚠️ Using demo data (backend not connected)</span>
        ) : (
          <span className="text-green-600">✅ Live data from database</span>
        )}
      </div>
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reported posts</p>
        ) : (
          posts.map((post) => (
            <ReportedPostItem 
              key={post.id}
              id={post.id}
              author={post.author}
              time={post.time}
              content={post.content}
              reportedBy={post.reportedBy}
              reason={post.reason}
              status={post.status}
              onDelete={() => handlePostDelete(post.id)}
              onResolve={() => handlePostResolve(post.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReportedPosts;