export const shoutouts = [
  {
    id: 1,
    sender: {
      name: 'Michael Chen',
      role: 'Senior Developer',
      avatar: 'https://i.pravatar.cc/48?u=michael-chen-dev',
    },
    recipient: { name: 'Jessica Park' },
    badge: { emoji: '⭐', label: 'Innovation Star' },
    message:
      "Jessica absolutely crushed it during our product launch! She worked late nights to fix critical bugs and mentored junior developers along the way. Her dedication and positive attitude made all the difference. Thank you! 🚀",
    timeAgo: '2 hours ago',
    reactions: { heart: 38, thumbsUp: 12, star: 15, comment: 5 },
  },
  {
    id: 2,
    sender: {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      avatar: 'https://i.pravatar.cc/48?u=sarah-johnson-pm',
    },
    recipient: { name: 'David Kim' },
    badge: { emoji: '🤝', label: 'Team Player' },
    message:
      "David's attention to detail in the redesign project was phenomenal. Every pixel was perfect, and he truly understood our users' needs. Outstanding work!",
    timeAgo: '5 hours ago',
    reactions: { heart: 24, thumbsUp: 9, star: 11, comment: 3 },
  },
];

export const notifications = [
  { id: 1, text: 'You received 3 new recognitions today.' },
  { id: 2, text: 'Sarah Johnson earned "Team Player" badge.' },
  { id: 3, text: 'David gave a shoutout to Emma.' },
];

export const activities = [
  { id: 1, text: 'David gave a shoutout to Emma', timeAgo: '2h ago' },
  { id: 2, text: 'Sarah earned Innovation Star badge', timeAgo: '5h ago' },
  { id: 3, text: 'Michael completed Q1 campaign', timeAgo: '1d ago' },
];

export const teamMembers = [
  { id: 1, name: 'Jessica Park',    role: 'Engineering Lead', department: 'Engineering', avatar: 'https://i.pravatar.cc/80?u=jessica-park',       shoutOuts: 42, claps: 89, stars: 67 },
  { id: 2, name: 'David Kim',       role: 'UX Designer',      department: 'Design',       avatar: 'https://i.pravatar.cc/80?u=david-kim-design',    shoutOuts: 38, claps: 76, stars: 66 },
  { id: 3, name: 'Sarah Johnson',   role: 'Product Manager',  department: 'Design',       avatar: 'https://i.pravatar.cc/80?u=sarah-johnson-pm',    shoutOuts: 45, claps: 92, stars: 76 },
  { id: 4, name: 'Michael Chen',    role: 'Senior Developer', department: 'Engineering', avatar: 'https://i.pravatar.cc/80?u=michael-chen-dev',    shoutOuts: 35, claps: 68, stars: 60 },
  { id: 5, name: 'Emily Rodriguez', role: 'Marketing Lead',   department: 'Marketing',    avatar: 'https://i.pravatar.cc/80?u=emily-rodriguez',     shoutOuts: 40, claps: 82, stars: 63 },
  { id: 6, name: 'Alex Thompson',   role: 'Sales Manager',    department: 'Sales',        avatar: 'https://i.pravatar.cc/80?u=alex-thompson-admin', shoutOuts: 32, claps: 65, stars: 53 },
];

export const badgesList = [
  { id: 1, emoji: '⭐', name: 'Innovation Star',      description: 'For groundbreaking ideas',  awarded: 24 },
  { id: 2, emoji: '🤝', name: 'Team Player',           description: 'Exceptional collaboration', awarded: 32 },
  { id: 3, emoji: '💡', name: 'Creative Genius',       description: 'Outstanding creativity',    awarded: 18 },
  { id: 4, emoji: '👑', name: 'Leadership Excellence', description: 'Inspiring leadership',      awarded: 15 },
  { id: 5, emoji: '🎯', name: 'Problem Solver',        description: 'Critical thinking master',  awarded: 28 },
  { id: 6, emoji: '✨', name: 'Culture Champion',      description: 'Building great culture',    awarded: 21 },
  { id: 7, emoji: '🏆', name: 'Sales Champion',        description: 'Sales excellence',          awarded: 19 },
  { id: 8, emoji: '💪', name: 'Customer Hero',         description: 'Customer satisfaction',     awarded: 26 },
];

export const analyticsMetrics = [
  { label: 'Total Shout-Outs', value: '245',   trend: '+12%', iconKey: 'shoutouts', cardVariant: 'purple' },
  { label: 'Total Reactions',  value: '1,842', trend: '+18%', iconKey: 'reactions', cardVariant: 'pink' },
  { label: 'Active Users',     value: '56',    trend: '+8%',  iconKey: 'users',     cardVariant: 'green' },
];

export const topContributors = [
  { name: 'Jessica', value: 48 },
  { name: 'Sarah',   value: 40 },
  { name: 'David',   value: 34 },
  { name: 'Michael', value: 32 },
  { name: 'Emily',   value: 31 },
];

export const departmentEngagement = [
  { name: 'Engineering', value: 35, color: '#4F46E5' },
  { name: 'Design',      value: 25, color: '#8B5CF6' },
  { name: 'Marketing',   value: 20, color: '#F59E0B' },
  { name: 'Sales',       value: 15, color: '#10B981' },
  { name: 'HR',          value: 5,  color: '#F43F5E' },
];

export const leaderboardStats = [
  { label: 'Top Score', value: '3,256', sub: 'Jessica Park', variant: 'yellow' },
  { label: 'Total Badges', value: '83', sub: 'Awarded this month', variant: 'gray' },
  { label: 'Growth', value: '+24%', sub: 'vs last month', variant: 'green' },
];

// Ordered as: 2nd | 1st | 3rd for podium layout
export const topPerformers = [
  { rank: 2, name: 'Sarah Johnson', score: 2847, department: 'Design', badges: 12 },
  { rank: 1, name: 'Jessica Park', score: 3256, department: 'Engineering', badges: 15 },
  { rank: 3, name: 'David Kim', score: 2634, department: 'Marketing', badges: 10 },
];

export const fullRankings = [
  { rank: 4,  name: 'Michael Chen',    department: 'Engineering', points: 2456, badges: 9, trend: 'up',   avatar: 'https://i.pravatar.cc/40?u=michael-chen-dev' },
  { rank: 5,  name: 'Emily Rodriguez', department: 'Marketing',   points: 2198, badges: 8, trend: 'up',   avatar: 'https://i.pravatar.cc/40?u=emily-rodriguez' },
  { rank: 6,  name: 'Alex Thompson',   department: 'Sales',       points: 2045, badges: 7, trend: 'down', avatar: 'https://i.pravatar.cc/40?u=alex-thompson-admin' },
  { rank: 7,  name: 'James Wilson',    department: 'Sales',       points: 1923, badges: 6, trend: 'up',   avatar: 'https://i.pravatar.cc/40?u=james-wilson-sales' },
  { rank: 8,  name: 'Lisa Anderson',   department: 'HR',          points: 1876, badges: 6, trend: 'up',   avatar: 'https://i.pravatar.cc/40?u=lisa-anderson-hr' },
  { rank: 9,  name: 'Robert Chang',    department: 'Engineering', points: 1745, badges: 5, trend: 'down', avatar: 'https://i.pravatar.cc/40?u=robert-chang-eng' },
  { rank: 10, name: 'Maria Garcia',    department: 'Design',      points: 1612, badges: 5, trend: 'up',   avatar: 'https://i.pravatar.cc/40?u=maria-garcia-design' },
];
