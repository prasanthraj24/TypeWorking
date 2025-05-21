import React, { useState } from 'react';
import { FileText, Upload, FileUp, Clock, DollarSign, Trash2, Edit, PlusCircle, Check } from 'lucide-react';

// Mock data - in a real app, this would come from your API
const mockDocuments = [
  {
    id: '1',
    title: 'Introduction to Blockchain Technology',
    status: 'active',
    difficulty: 'easy',
    wordCount: 250,
    taskCount: 47,
    earnings: 0.0235,
    createdAt: '2023-06-10T14:32:00Z',
  },
  {
    id: '2',
    title: 'Smart Contracts and DApps',
    status: 'active',
    difficulty: 'medium',
    wordCount: 400,
    taskCount: 32,
    earnings: 0.0384,
    createdAt: '2023-06-08T09:15:00Z',
  },
  {
    id: '3',
    title: 'The Future of Decentralized Finance',
    status: 'active',
    difficulty: 'hard',
    wordCount: 600,
    taskCount: 18,
    earnings: 0.0360,
    createdAt: '2023-06-05T11:22:00Z',
  },
  {
    id: '4',
    title: 'Ethereum 2.0: The Merge and Beyond',
    status: 'pending',
    difficulty: 'medium',
    wordCount: 450,
    taskCount: 0,
    earnings: 0,
    createdAt: '2023-06-15T08:44:00Z',
  },
];

const mockStats = {
  totalDocuments: 4,
  activeDocuments: 3,
  totalEarnings: 0.0979,
  pendingDocuments: 1,
};

const UploaderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    content: '',
    difficulty: 'medium'
  });
  
  const handleNewDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('New document submitted:', newDocument);
    
    // Reset form and hide it
    setNewDocument({
      title: '',
      content: '',
      difficulty: 'medium'
    });
    setShowNewDocumentForm(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary-900/20 text-secondary-500';
      case 'pending':
        return 'bg-accent-900/20 text-accent-500';
      default:
        return 'bg-primary-900/20 text-primary-500';
    }
  };

  const filteredDocuments = activeTab === 'all' 
    ? mockDocuments 
    : mockDocuments.filter(doc => doc.status === activeTab);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Uploader Dashboard</h1>
        <p className="text-dark-600 mt-1">Manage your documents and track earnings.</p>
      </header>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-primary-900/20 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Total Documents</p>
              <p className="text-2xl font-semibold text-white">{mockStats.totalDocuments}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-secondary-900/20 p-3 rounded-lg">
              <Check className="h-6 w-6 text-secondary-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Active Documents</p>
              <p className="text-2xl font-semibold text-white">{mockStats.activeDocuments}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-accent-900/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-accent-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Total Earnings</p>
              <p className="text-2xl font-semibold text-white">{mockStats.totalEarnings} ETH</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-dark-200 border border-dark-300">
          <div className="flex items-center">
            <div className="bg-error-900/20 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-error-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600 text-sm">Pending Documents</p>
              <p className="text-2xl font-semibold text-white">{mockStats.pendingDocuments}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Document Management */}
      <div className="card bg-dark-200 border border-dark-300">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 sm:mb-0">Your Documents</h2>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex border border-dark-400 rounded-md overflow-hidden">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm ${
                  activeTab === 'all' ? 'bg-primary-600 text-white' : 'bg-dark-300 text-dark-600 hover:bg-dark-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 text-sm ${
                  activeTab === 'active' ? 'bg-primary-600 text-white' : 'bg-dark-300 text-dark-600 hover:bg-dark-400'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 text-sm ${
                  activeTab === 'pending' ? 'bg-primary-600 text-white' : 'bg-dark-300 text-dark-600 hover:bg-dark-400'
                }`}
              >
                Pending
              </button>
            </div>
            
            <button
              onClick={() => setShowNewDocumentForm(true)}
              className="btn btn-primary"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Document
            </button>
          </div>
        </div>
        
        {showNewDocumentForm && (
          <div className="mb-8 p-6 bg-dark-300 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Upload New Document</h3>
            <form onSubmit={handleNewDocumentSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-dark-600 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full input"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-dark-600 mb-1">
                  Document Content
                </label>
                <textarea
                  id="content"
                  rows={6}
                  className="w-full input"
                  value={newDocument.content}
                  onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
                  required
                ></textarea>
                <p className="text-dark-600 text-xs mt-1">
                  Word count: {newDocument.content.split(/\s+/).filter(Boolean).length}
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="difficulty" className="block text-sm font-medium text-dark-600 mb-1">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  className="w-full input"
                  value={newDocument.difficulty}
                  onChange={(e) => setNewDocument({ ...newDocument, difficulty: e.target.value })}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowNewDocumentForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Tasks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-300">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-dark-600">
                    No documents found.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{doc.title}</p>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded border ${getDifficultyColor(doc.difficulty)}`}>
                            {doc.difficulty.charAt(0).toUpperCase() + doc.difficulty.slice(1)}
                          </span>
                          <span className="text-xs text-dark-600 ml-2">
                            {doc.wordCount} words
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-600">
                      {doc.taskCount}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-500 font-medium">
                      {doc.earnings} ETH
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-600">
                      {formatDate(doc.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button className="text-primary-500 hover:text-primary-600">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-error-500 hover:text-error-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Earnings Information */}
      <div className="mt-8 card bg-dark-200 border border-dark-300">
        <h2 className="text-lg font-semibold text-white mb-6">Earning Information</h2>
        
        <p className="text-dark-600 mb-4">
          As a document uploader, you earn 70% of the rewards generated when users type your documents, while 30% goes to the typist.
        </p>
        
        <div className="bg-dark-300 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="bg-accent-900/20 p-3 rounded-lg">
              <FileUp className="h-6 w-6 text-accent-500" />
            </div>
            <div className="ml-4">
              <p className="text-dark-600">Upload more documents to increase your earnings potential.</p>
              <p className="text-sm text-dark-500 mt-1">Higher difficulty documents typically yield higher rewards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploaderDashboard;