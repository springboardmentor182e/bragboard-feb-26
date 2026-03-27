import React from 'react';
import ReportedPosts from '../ReportedPosts';

const ReportedPostsPage = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reported Posts</h1>
        <p className="text-sm text-gray-500">Manage and moderate reported content</p>
      </div>
      <ReportedPosts />
    </>
  );
};

export default ReportedPostsPage;