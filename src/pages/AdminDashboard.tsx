import React, { useState } from 'react';
import { Users, FileText, DollarSign, Activity, ArrowUp, ArrowDown, CheckCircle, Layers } from 'lucide-react';

// Mock data - in a real app, this would come from your API
const mockStats = {
  totalUsers: 2457,
  totalDocuments: 186,
  totalEarnings: 125.78,
  activeUsers: 876,
};

const mockRecentTransactions = [
  { id: '1', user: '0x1a2b...3c4d', amount: 0.0042, timestamp: '2023-06-15T14:32:00Z', status: 'completed' },
  { id: '2', user: '0x5e6f...7g8h', amount: 0.0021, timestamp: '2023-06-15T12:17:00Z', status: 'completed' },
  { id: '3', user: '0x9i0j...1k2l', amount: 0.0076, timestamp: '2023-06-15T09:45:00Z', status: 'completed' },
  { id: '4', user: '0x3m4n...5o6p', amount: 0.0033, timestamp: '2023-06-14T22:01:00Z', status: 'completed' },
  { id: '5', user: '0x7q8r...9s0t', amount: 0.0018, timestamp: '2023-06-14T18:23:00Z', status: 'completed' },
];

const mockTopUsers = [
  { address: '0x1a2b...3c4d', earnings: 0.2345, tasksCompleted: 78 },
  { address: '0x5e6f...7g8h', earnings: 0.1976, tasksCompleted: 62 },
  { address: '0x9i0j...1k2l', earnings: 0.1754, tasksCompleted: 53 },
  { address: '0x3m4n...5o6p', earnings: 0.1432, tasksCompleted: 47 },
  { address: '0x7q8r...9s0t', earnings: 0.1287, tasksCompleted: 41 },
];

const AdminDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-dark-600 mt-1">Monitor and manage the CryptoType platform.</p>
      </header>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-primary-900/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Total Users</p>
              <p className="text-2xl font-semibold text-white">{mockStats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-secondary-900/20 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-secondary-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Total Documents</p>
              <p className="text-2xl font-semibold text-white">{mockStats.totalDocuments}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-accent-900/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-accent-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Total ETH Distributed</p>
              <p className="text-2xl font-semibold text-white">{mockStats.totalEarnings} ETH</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-error-900/20 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-error-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Active Users</p>
              <p className="text-2xl font-semibold text-white">{mockStats.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="card bg-dark-200 border border-dark-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <div>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="bg-dark-300 border border-dark-400 text-dark-700 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-dark-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-300">
                  {mockRecentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-700">{tx.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">{tx.amount} ETH</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-700">{formatDate(tx.timestamp)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-900/20 text-secondary-500">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-primary-500 hover:text-primary-600 text-sm">
                View All Transactions
              </button>
            </div>
          </div>
        </div>
        
        {/* Top Users */}
        <div>
          <div className="card bg-dark-200 border border-dark-300">
            <h2 className="text-lg font-semibold text-white mb-6">Top Earners</h2>
            
            <div className="space-y-4">
              {mockTopUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-dark-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-dark-700">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-dark-700">{user.address}</p>
                      <p className="text-xs text-dark-600">{user.tasksCompleted} tasks completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-secondary-500">{user.earnings} ETH</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-primary-500 hover:text-primary-600 text-sm">
                View All Users
              </button>
            </div>
          </div>
          
          {/* ETH Distribution */}
          <div className="card bg-dark-200 border border-dark-300 mt-6">
            <h2 className="text-lg font-semibold text-white mb-6">ETH Distribution</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-dark-600">User Rewards (30%)</p>
                  <p className="text-white font-medium">{(mockStats.totalEarnings * 0.3).toFixed(2)} ETH</p>
                </div>
                <div className="bg-dark-300 h-3 rounded-full">
                  <div className="bg-primary-600 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-dark-600">Platform Revenue (70%)</p>
                  <p className="text-white font-medium">{(mockStats.totalEarnings * 0.7).toFixed(2)} ETH</p>
                </div>
                <div className="bg-dark-300 h-3 rounded-full">
                  <div className="bg-secondary-600 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-dark-300">
              <div className="flex justify-between items-center">
                <p className="text-dark-600">Total</p>
                <p className="text-xl font-semibold text-white">{mockStats.totalEarnings} ETH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Platform Activity */}
      <div className="mt-8">
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Platform Activity</h2>
            <div>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-dark-300 border border-dark-400 text-dark-700 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-dark-300 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-dark-600">New Users</p>
                <ArrowUp className="h-4 w-4 text-secondary-500" />
              </div>
              <p className="text-2xl font-semibold text-white">+124</p>
              <p className="text-sm text-dark-600">+12% from last period</p>
            </div>
            
            <div className="bg-dark-300 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-dark-600">Completed Tasks</p>
                <ArrowUp className="h-4 w-4 text-secondary-500" />
              </div>
              <p className="text-2xl font-semibold text-white">+843</p>
              <p className="text-sm text-dark-600">+8% from last period</p>
            </div>
            
            <div className="bg-dark-300 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-dark-600">ETH Distributed</p>
                <ArrowUp className="h-4 w-4 text-secondary-500" />
              </div>
              <p className="text-2xl font-semibold text-white">+2.45 ETH</p>
              <p className="text-sm text-dark-600">+15% from last period</p>
            </div>
            
            <div className="bg-dark-300 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-dark-600">New Documents</p>
                <ArrowDown className="h-4 w-4 text-error-500" />
              </div>
              <p className="text-2xl font-semibold text-white">+12</p>
              <p className="text-sm text-dark-600">-3% from last period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;