// Mock data for AdminDashboard
// Use this data when server is not running for development

export const mockDashboardStats = {
  total_posts: 127,
  total_shoutouts: 127,
  total_reactions: 453,
  active_users_today: 42,
  active_users: 87,
  total_reports: 5,
  shoutout_trend: '+12%',
  reaction_trend: '+8%'
};

export const mockTopContributors = [
  { id: 1, name: 'Alex Cooper', avatar: 'AC', shoutouts: 24, level: 'lv 4' },
  { id: 2, name: 'Sarah Johnson', avatar: 'SJ', shoutouts: 18, level: 'lv 3' },
  { id: 3, name: 'Mike Chen', avatar: 'MC', shoutouts: 15, level: 'lv 2' },
  { id: 4, name: 'Emma Wilson', avatar: 'EW', shoutouts: 12, level: 'lv 2' },
  { id: 5, name: 'James Brown', avatar: 'JB', shoutouts: 10, level: 'lv 1' }
];

export const mockDepartmentEngagement = [
  { name: 'Leadership', value: 9, color: '#EF4444' },
  { name: 'Team', value: 8, color: '#F97316' },
  { name: 'Badges', value: 7, color: '#06B6D4' },
  { name: 'Feed', value: 5, color: '#10B981' },
  { name: 'Analytics', value: 6, color: '#D946EF' },
  { name: 'Leaderboard', value: 4, color: '#8B5CF6' }
];

export const mockReportedPosts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'This is an inappropriate shout-out that violates community guidelines.',
    reports: 3,
    status: 'pending',
    reportedAt: '2024-03-23T10:30:00Z'
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Spam content detected in this shout-out.',
    reports: 2,
    status: 'pending',
    reportedAt: '2024-03-23T14:15:00Z'
  }
];

export default {
  mockDashboardStats,
  mockTopContributors,
  mockDepartmentEngagement,
  mockReportedPosts
};
