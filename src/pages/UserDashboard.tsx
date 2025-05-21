import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, Check, PenTool, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// This is mock data. In a real application, you would fetch this data from your API
const mockDocuments = [
  {
    id: '1',
    title: 'Introduction to Blockchain Technology',
    difficulty: 'easy',
    wordCount: 250,
    estimatedTime: '3 min',
    reward: 0.0005,
  },
  {
    id: '2',
    title: 'Smart Contracts and DApps',
    difficulty: 'medium',
    wordCount: 400,
    estimatedTime: '5 min',
    reward: 0.0012,
  },
  {
    id: '3',
    title: 'The Future of Decentralized Finance',
    difficulty: 'hard',
    wordCount: 600,
    estimatedTime: '8 min',
    reward: 0.0020,
  },
  {
    id: '4',
    title: 'Ethereum 2.0: The Merge and Beyond',
    difficulty: 'medium',
    wordCount: 450,
    estimatedTime: '6 min',
    reward: 0.0014,
  },
];

// Mock stats for the user
const mockStats = {
  completedTasks: 12,
  totalEarned: 0.0156,
  wordsTyped: 4850,
  accuracy: 97.3,
};

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-secondary-900/20 text-secondary-500 border-secondary-800';
      case 'medium':
        return 'bg-accent-900/20 text-accent-500 border-accent-800';
      case 'hard':
        return 'bg-error-900/20 text-error-500 border-error-800';
      default:
        return 'bg-primary-900/20 text-primary-500 border-primary-800';
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome, {user?.username || 'Typist'}</h1>
        <p className="text-dark-600 mt-1">Start typing to earn Ethereum rewards.</p>
      </header>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-primary-900/20 p-3 rounded-lg">
              <Check className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Completed Tasks</p>
              <p className="text-2xl font-semibold text-white">{mockStats.completedTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-secondary-900/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-secondary-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Total Earned</p>
              <p className="text-2xl font-semibold text-white">{mockStats.totalEarned} ETH</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-accent-900/20 p-3 rounded-lg">
              <PenTool className="h-6 w-6 text-accent-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Words Typed</p>
              <p className="text-2xl font-semibold text-white">{mockStats.wordsTyped}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-error-900/20 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-error-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Accuracy</p>
              <p className="text-2xl font-semibold text-white">{mockStats.accuracy}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-dark-300">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`pb-3 px-1 font-medium ${
              activeTab === 'available'
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-dark-600 hover:text-dark-800'
            }`}
          >
            Available Tasks
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 px-1 font-medium ${
              activeTab === 'completed'
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-dark-600 hover:text-dark-800'
            }`}
          >
            Completed Tasks
          </button>
        </nav>
      </div>
      
      {/* Document List */}
      {activeTab === 'available' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockDocuments.map((doc) => (
            <div key={doc.id} className="card bg-dark-200 border border-dark-300 hover:border-primary-500 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{doc.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${getDifficultyColor(doc.difficulty)}`}>
                      {doc.difficulty.charAt(0).toUpperCase() + doc.difficulty.slice(1)}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-dark-300 text-dark-600 border border-dark-400">
                      <FileText className="inline h-3 w-3 mr-1" />
                      {doc.wordCount} words
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-dark-300 text-dark-600 border border-dark-400">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {doc.estimatedTime}
                    </span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <DollarSign className="h-5 w-5 mr-1" />
                    <span className="font-semibold">{doc.reward} ETH</span>
                    <span className="text-dark-600 text-sm ml-2">potential reward</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-dark-300">
                <Link
                  to={`/typing-task/${doc.id}`}
                  className="w-full btn btn-primary"
                >
                  Start Typing
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-dark-600 mb-4">
            <Check className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">All caught up!</h3>
          <p className="text-dark-600 max-w-md mx-auto">
            You've completed {mockStats.completedTasks} tasks. Find more available tasks to continue earning.
          </p>
          <button
            onClick={() => setActiveTab('available')}
            className="mt-6 btn btn-outline"
          >
            View Available Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;