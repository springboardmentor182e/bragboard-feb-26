import React, { useState, useEffect } from 'react';
import { fetchReportsWithDetails, updateReportStatus, deleteReport } from '../../../services/reportService';

const SimpleReportedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('SimpleReportedPosts: Fetching reports with PENDING status...');
      // Use the same endpoint as the full ReportedPosts page with PENDING status
      const data = await fetchReportsWithDetails('PENDING', null, null);
      console.log('SimpleReportedPosts: Fetched data:', data);
      const postsData = Array.isArray(data) ? data.slice(0, 5) : [];
      console.log('SimpleReportedPosts: Posts after slice:', postsData);
      setPosts(postsData);
    } catch (error) {
      console.error('SimpleReportedPosts: Error fetching reports:', error);
      setError('Failed to load reports');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (reportId) => {
    if (!window.confirm('Are you sure you want to resolve this report?')) return;
    try {
      console.log('SimpleReportedPosts: Resolving report', reportId);
      await updateReportStatus(reportId, 'RESOLVED');
      setPosts(posts.filter(p => p.report_id !== reportId));
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Failed to resolve report');
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this shoutout?')) return;
    try {
      console.log('SimpleReportedPosts: Deleting report', reportId);
      await deleteReport(reportId);
      setPosts(posts.filter(p => p.report_id !== reportId));
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Reported Posts</h3>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-red-200">
          <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Reported Posts</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
        <button 
          onClick={fetchReports}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-red-200">
        <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Reported Posts</h3>
          <p className="text-sm text-gray-600">{posts.length} posts requiring moderation</p>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No reported posts at this time</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.report_id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-red-300 transition">
              {/* Post header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {post.sender_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{post.sender_name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">• {post.report_created_at || 'unknown'}</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{post.message || 'No content'}</p>
                </div>
              </div>

              {/* Report info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3 flex flex-wrap items-center gap-3">
                <div>
                  <span className="text-xs text-gray-600">Reported by:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">{post.reporter_name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-gray-600">Reason:</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    {post.reason || 'Unknown'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResolve(post.report_id)}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Resolve
                </button>
                <button
                  onClick={() => handleDelete(post.report_id)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
                <button className="ml-auto px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-lg transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SimpleReportedPosts;
