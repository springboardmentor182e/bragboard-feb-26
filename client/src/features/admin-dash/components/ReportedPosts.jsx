import React from 'react';
import ReportedPostItem from './ReportedPostItem';

const posts = [
  {
    author: 'Alex Thompson',
    time: '2 hours ago',
    content: 'This is an amazing achievement that really shows how much effort...',
    reportedBy: 'Anonymous',
    reason: 'Inappropriate content'
  },
  {
    author: 'Sarah Chen',
    time: '5 hours ago',
    content: 'Congratulations to the entire team for hitting our quarterly goals...',
    reportedBy: 'James Wilson',
    reason: 'Spam or misleading'
  },
  {
    author: 'Marcus Johnson',
    time: '1 day ago',
    content: 'Big shout-out to everyone who contributed to the product launch...',
    reportedBy: 'Anonymous',
    reason: 'Off-topic content'
  }
];

const ReportedPosts = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Reported Posts</h2>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {posts.length} posts requiring moderation
        </span>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <ReportedPostItem key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default ReportedPosts;