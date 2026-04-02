import React, { useState, useEffect } from 'react';
import ReportedPostItem from './ReportedPostItem';
import { fetchReportsWithDetails, updateReportStatus, deleteReport } from '../../../services/reportService';
import useToast from '../../employeeDashboard/hooks/useToast';

const ReportedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  // Fetch reports with shoutout details from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching reports with details...');
      // Fetch only PENDING reports for the moderation queue
      const data = await fetchReportsWithDetails('PENDING', null, null);
      console.log('Fetched reports:', data);
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load reports. Please try again.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete shoutout + report
  const handlePostDelete = async (reportId) => {
    try {
      if (!window.confirm('Are you sure you want to delete this shoutout? This action cannot be undone.')) {
        return;
      }
      
      // Delete the report (shoutout will be handled separately if needed)
      await deleteReport(reportId);
      
      // Remove from UI
      setPosts(prevPosts => prevPosts.filter(post => post.report_id !== reportId));
      
      showToast('Shoutout deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting shoutout:', error);
      showToast('Failed to delete shoutout', 'error');
    }
  };

  // Handle report actions (Dismiss, Warn, Escalate)
  const handleReportAction = async (reportId, action) => {
    try {
      let newStatus = 'RESOLVED';
      
      if (action === 'dismiss') {
        newStatus = 'RESOLVED';
      } else if (action === 'warn') {
        newStatus = 'REVIEWING';
      } else if (action === 'escalate') {
        newStatus = 'REVIEWING';
      }
      
      // Update report status
      await updateReportStatus(reportId, newStatus);
      
      // Remove from UI since we're only showing PENDING reports
      setPosts(prevPosts => prevPosts.filter(post => post.report_id !== reportId));
      
      const actionMessages = {
        'dismiss': 'Report dismissed',
        'warn': 'User warned - Report marked for review',
        'escalate': 'Report escalated for senior review'
      };
      
      showToast(actionMessages[action], 'success');
    } catch (error) {
      console.error('Error handling report action:', error);
      showToast('Failed to process action', 'error');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-8 gap-4 border-b-2 border-gray-100">
          <div>
            <h2 className="text-2xl font-black text-gray-950">Reported Posts</h2>
            <p className="text-sm text-gray-600 font-medium mt-1">Loading...</p>
          </div>
        </div>
        <p className="text-gray-600 font-medium text-center py-16">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-red-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-8 gap-4 border-b-2 border-gray-100">
          <div>
            <h2 className="text-2xl font-black text-gray-950">Reported Posts</h2>
            <p className="text-sm text-red-600 font-medium mt-1">Error loading reports</p>
          </div>
        </div>
        <p className="text-red-600 text-center font-semibold py-6">{error}</p>
        <button 
          onClick={fetchReports}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all font-bold mx-auto block"
        >
          Try Again
        </button>
      </div>
    );
  }

  const pendingPosts = posts.filter(p => p.status === 'PENDING');

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
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
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 font-medium mb-2">No reported posts found</p>
            <p className="text-gray-400 text-sm mb-6">All reports have been handled or no new reports yet</p>
            <button 
              onClick={fetchReports}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <ReportedPostItem 
              key={post.report_id}
              report_id={post.report_id}
              report_created_at={post.report_created_at}
              message={post.message}
              sender_name={post.sender_name}
              reporter_name={post.reporter_name}
              reason={post.reason}
              description={post.description}
              priority={post.priority}
              status={post.status}
              category={post.category}
              points={post.points}
              recipients={post.recipients}
              onDelete={handlePostDelete}
              onReportAction={handleReportAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReportedPosts;