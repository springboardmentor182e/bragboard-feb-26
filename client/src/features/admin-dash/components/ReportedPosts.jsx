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
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <p className="text-gray-600 font-medium text-center py-16">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-red-100">
        <p className="text-red-600 text-center font-semibold py-12">{error}</p>
        <button 
          onClick={fetchReports}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all font-bold mx-auto block"
        >
          Try Again
        </button>
      </div>
    );
  }

  const pendingPosts = posts.filter(p => p.status !== 'resolved');

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      {/* Success message */}
      {message && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border-2 border-emerald-200 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {message}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-8 gap-4 border-b-2 border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-gray-950">Reported Posts</h2>
          <p className="text-sm text-gray-600 font-medium mt-1">{pendingPosts.length} items pending moderation</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-700 text-sm font-bold rounded-lg border-2 border-indigo-200 shadow-sm">
            Total: <span className="font-black">{posts.length}</span>
          </div>
          <div className="px-4 py-2 bg-gradient-to-br from-rose-50 to-red-50 text-rose-700 text-sm font-bold rounded-lg border-2 border-rose-200 shadow-sm">
            Pending: <span className="font-black">{pendingPosts.length}</span>
          </div>
        </div>
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