import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Eye, MoreVertical, ThumbsUp, MessageCircle, Flag, Archive, CheckCircle } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';

const ShoutOutManagement = () => {
  const [shoutOuts, setShoutOuts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with API call
  const sampleShoutOuts = [
    {
      id: 'SO-001',
      sender: {
        name: 'Sarah Chen',
        avatar: 'SC',
        department: 'Engineering'
      },
      recipients: [
        { name: 'Sarah Chen', department: 'Engineering' }
      ],
      message: 'Incredible work on the Q4 project delivery! Your dedication and attention to detail made all the difference. 🚀',
      campaign: 'Q1 Excellence Recognition Drive',
      campaignIcon: '🎉',
      engagement: {
        likes: 24,
        comments: 8,
        claps: 12,
        stars: 5
      },
      status: 'active',
      createdAt: '2024-03-15T10:30:00Z',
      reported: false
    },
    {
      id: 'SO-002',
      sender: {
        name: 'Michael Rodriguez',
        avatar: 'MR',
        department: 'Design'
      },
      recipients: [
        { name: 'Emily Johnson', department: 'Design' },
        { name: 'Lisa Wong', department: 'Design' }
      ],
      message: 'Emily\'s presentation to the client was absolutely outstanding! The new design system is a game-changer. 🌟',
      campaign: 'Innovation Week',
      campaignIcon: '💡',
      engagement: {
        likes: 32,
        comments: 12,
        claps: 18,
        stars: 7
      },
      status: 'active',
      createdAt: '2024-03-14T14:20:00Z',
      reported: false
    },
    {
      id: 'SO-003',
      sender: {
        name: 'Alex Cooper',
        avatar: 'AC',
        department: 'Marketing'
      },
      recipients: [
        { name: 'Marketing Team', department: 'Marketing' }
      ],
      message: 'Great work team! Keep the momentum going with the new campaign strategy. The results are amazing! 🎯',
      campaign: 'Marketing Excellence',
      campaignIcon: '📈',
      engagement: {
        likes: 45,
        comments: 15,
        claps: 22,
        stars: 10
      },
      status: 'active',
      createdAt: '2024-03-13T09:15:00Z',
      reported: false
    },
    {
      id: 'SO-004',
      sender: {
        name: 'Rachel Anderson',
        avatar: 'RA',
        department: 'Sales'
      },
      recipients: [
        { name: 'Sales Team', department: 'Sales' }
      ],
      message: 'Q1 targets exceeded by 150%! Amazing performance everyone! 🏆',
      campaign: 'Sales Champions',
      campaignIcon: '🏆',
      engagement: {
        likes: 67,
        comments: 23,
        claps: 34,
        stars: 15
      },
      status: 'active',
      createdAt: '2024-03-12T16:45:00Z',
      reported: true
    },
    {
      id: 'SO-005',
      sender: {
        name: 'John Smith',
        avatar: 'JS',
        department: 'Engineering'
      },
      recipients: [
        { name: 'Backend Team', department: 'Engineering' }
      ],
      message: 'Exceptional work on the API optimization - 40% performance improvement! ⚡',
      campaign: 'Tech Excellence',
      campaignIcon: '⚡',
      engagement: {
        likes: 52,
        comments: 18,
        claps: 28,
        stars: 12
      },
      status: 'archived',
      createdAt: '2024-03-10T11:00:00Z',
      reported: false
    },
    {
      id: 'SO-006',
      sender: {
        name: 'Emma Watson',
        avatar: 'EW',
        department: 'HR'
      },
      recipients: [
        { name: 'HR Team', department: 'HR' }
      ],
      message: 'Thank you for organizing the amazing team building event! Everyone had a great time! 🎉',
      campaign: 'Team Building',
      campaignIcon: '🎯',
      engagement: {
        likes: 38,
        comments: 14,
        claps: 20,
        stars: 8
      },
      status: 'active',
      createdAt: '2024-03-09T13:30:00Z',
      reported: false
    },
    {
      id: 'SO-007',
      sender: {
        name: 'David Kim',
        avatar: 'DK',
        department: 'Marketing'
      },
      recipients: [
        { name: 'Content Team', department: 'Marketing' }
      ],
      message: 'The new blog content is getting amazing engagement! Keep up the great work! 📝',
      campaign: 'Content Excellence',
      campaignIcon: '📝',
      engagement: {
        likes: 29,
        comments: 9,
        claps: 15,
        stars: 6
      },
      status: 'needs_review',
      createdAt: '2024-03-08T10:00:00Z',
      reported: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setShoutOuts(sampleShoutOuts);
      setLoading(false);
    }, 1000);
  }, []);

  // Statistics calculation
  const stats = {
    total: shoutOuts.length,
    mostEngaged: Math.max(...shoutOuts.map(s => 
      s.engagement.likes + s.engagement.comments + s.engagement.claps + s.engagement.stars
    ), 0),
    active: shoutOuts.filter(s => s.status === 'active').length,
    reported: shoutOuts.filter(s => s.reported === true).length,
    archived: shoutOuts.filter(s => s.status === 'archived').length,
    needsReview: shoutOuts.filter(s => s.status === 'needs_review').length,
    completed: shoutOuts.filter(s => s.status === 'completed').length
  };

  // Filter shout-outs
  const filteredShoutOuts = shoutOuts.filter(shout => {
    const matchesSearch = searchTerm === '' || 
      shout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shout.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shout.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shout.recipients.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'all' || shout.status === selectedStatus;
    const matchesCampaign = selectedCampaign === 'all' || shout.campaign === selectedCampaign;
    
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  const campaigns = ['all', ...new Set(shoutOuts.map(s => s.campaign))];

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
      needs_review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return badges[status] || badges.active;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>;
      case 'archived':
        return <Archive size={14} className="mr-1" />;
      case 'needs_review':
        return <Flag size={14} className="mr-1 text-yellow-600" />;
      case 'completed':
        return <CheckCircle size={14} className="mr-1 text-blue-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shout-Out Management</h2>
            <p className="text-gray-600 mt-1">
              Manage all recognition posts across the organization with powerful filtering and moderation tools.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Total Shout-Outs</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Most engaged</p>
            <p className="text-2xl font-bold text-purple-900">{stats.mostEngaged}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Active</p>
            <p className="text-2xl font-bold text-green-900">{stats.active}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
            <p className="text-sm text-red-600 font-medium">Reported</p>
            <p className="text-2xl font-bold text-red-900">{stats.reported}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">Archived</p>
            <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium">Needs review</p>
            <p className="text-2xl font-bold text-yellow-900">{stats.needsReview}</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
            <p className="text-sm text-teal-600 font-medium">Completed</p>
            <p className="text-2xl font-bold text-teal-900">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search shout-outs, people, badges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Filter size={18} />
            <span>Filters</span>
            <ChevronDown size={16} className={`transform transition ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="needs_review">Needs Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {campaigns.map(campaign => (
                  <option key={campaign} value={campaign}>
                    {campaign === 'all' ? 'All Campaigns' : campaign}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SENDER</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RECIPIENT(S)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MESSAGE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAMPAIGN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ENGAGEMENT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredShoutOuts.map((shout) => (
              <tr key={shout.id} className="hover:bg-gray-50 transition">
                {/* ID */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">{shout.id}</span>
                </td>

                {/* Sender */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                      {shout.sender.avatar}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{shout.sender.name}</p>
                      <p className="text-xs text-gray-500">{shout.sender.department}</p>
                    </div>
                  </div>
                </td>

                {/* Recipients */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {shout.recipients.map((recipient, idx) => (
                      <div key={idx} className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                        <span className="text-xs text-gray-700">{recipient.name}</span>
                        <span className="text-xs text-gray-500 ml-1">({recipient.department})</span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Message */}
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 line-clamp-2">{shout.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(shout.createdAt)}</p>
                  </div>
                </td>

                {/* Campaign */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{shout.campaignIcon}</span>
                    <span className="text-sm text-gray-900">{shout.campaign}</span>
                  </div>
                </td>

                {/* Engagement */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} className="text-blue-500" />
                      <span className="text-sm text-gray-700">{shout.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} className="text-green-500" />
                      <span className="text-sm text-gray-700">{shout.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">👏</span>
                      <span className="text-sm text-gray-700">{shout.engagement.claps}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-purple-500">⭐</span>
                      <span className="text-sm text-gray-700">{shout.engagement.stars}</span>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(shout.status)}`}>
                    {getStatusIcon(shout.status)}
                    <span className="capitalize">{shout.status.replace('_', ' ')}</span>
                  </div>
                  {shout.reported && (
                    <div className="mt-1">
                      <span className="inline-flex items-center text-xs text-red-600">
                        <Flag size={10} className="mr-1" />
                        Reported
                      </span>
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition" title="View Details">
                      <Eye size={18} className="text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition" title="More Options">
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredShoutOuts.length} of {shoutOuts.length} shout-outs
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            Next
          </button>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default ShoutOutManagement;