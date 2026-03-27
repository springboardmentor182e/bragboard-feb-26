import React, { useState, useEffect } from 'react';
import ReportedPostItem from './ReportedPostItem';
import { adminAPI } from '../../../services/api';

const ReportedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Add this for success messages

  // Fetch reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminAPI.getReports('pending');
      
      // Transform backend data to match frontend format
      const formattedPosts = response.data.map(report => ({
        id: report.id,
        author: report.content?.author || report.user_name || 'Unknown User',
        time: new Date(report.created_at).toLocaleString(),
        content: report.content?.content || report.title || 'No content',
        reportedBy: report.content?.reported_by || report.reporter_name || 'Anonymous',
        reason: report.content?.reason || report.type || 'Not specified',
        status: report.status || 'pending'
      }));
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load reports from server');
      // ❌ REMOVED: setFallbackData() - No more dummy data
      setPosts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // ❌ REMOVED: setFallbackData function completely

  // Handle post/report deletion
  const handlePostDelete = async (deletedPostId) => {
    try {
      console.log('Deleting report:', deletedPostId);
      
      // Show confirmation
      if (!window.confirm('Are you sure you want to delete this report?')) {
        return;
      }
      
      // Call API to delete the report
      await adminAPI.deleteReport(deletedPostId);
      
      // Remove from UI
      setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
      
      // Show success message
      setMessage('Report deleted successfully');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report. Please try again.');
    }
  };

  // Handle report resolution
  const handlePostResolve = async (reportId) => {
    try {
      // Show confirmation
      if (!window.confirm('Mark this report as resolved?')) {
        return;
      }
      
      // API call to resolve
      await adminAPI.resolveReport(reportId);
      
      // Update UI
      setPosts(posts.map(post => 
        post.id === reportId 
          ? { ...post, status: 'resolved' } 
          : post
      ));
      
      // Show success message
      setMessage('Report resolved successfully');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Failed to resolve report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="text-red-500 text-center">{error}</p>
        <button 
          onClick={fetchReports}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto block"
        >
          Retry
        </button>
      </div>
    );
  }

  const pendingPosts = posts.filter(p => p.status !== 'resolved');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Success message */}
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
          {message}
        </div>
      )}
      
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
        <span className="text-green-600">✅ Live data from database</span>
      </div>
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No reported posts found</p>
            <button 
              onClick={fetchReports}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
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