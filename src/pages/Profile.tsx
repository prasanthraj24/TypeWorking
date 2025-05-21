import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Save, DollarSign, Clock, Download, ExternalLink, Copy } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWeb3 } from '../hooks/useWeb3';

// Mock data - in a real app, this would come from your API
const mockTransactions = [
  { id: '1', type: 'earning', amount: 0.0025, timestamp: '2023-06-15T14:32:00Z', status: 'completed' },
  { id: '2', type: 'earning', amount: 0.0012, timestamp: '2023-06-14T09:17:00Z', status: 'completed' },
  { id: '3', type: 'withdrawal', amount: 0.0030, timestamp: '2023-06-12T18:05:00Z', status: 'completed' },
  { id: '4', type: 'earning', amount: 0.0008, timestamp: '2023-06-10T11:42:00Z', status: 'completed' },
  { id: '5', type: 'earning', amount: 0.0018, timestamp: '2023-06-08T15:23:00Z', status: 'completed' },
];

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { account } = useWeb3();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  const handleSaveProfile = () => {
    // In a real app, you would send this data to your API
    console.log('Saving profile with username:', username);
    setIsEditing(false);
  };
  
  const handleWithdraw = () => {
    // In a real app, you would initiate a withdrawal through your smart contract
    console.log('Initiating withdrawal of', withdrawAmount, 'ETH');
    setWithdrawAmount('');
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast notification
    console.log('Copied to clipboard:', text);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Your Profile</h1>
        <p className="text-dark-600 mt-1">Manage your account and view your earnings.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="card bg-dark-200 border border-dark-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-semibold text-white">Account Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary-500 hover:text-primary-600"
              >
                {isEditing ? (
                  <Save className="h-5 w-5" />
                ) : (
                  <Edit className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary-900/30 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user?.username?.[0] || account?.[2] || '?'}
              </div>
              
              {isEditing ? (
                <div className="w-full">
                  <label htmlFor="username" className="block text-sm font-medium text-dark-600 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full input mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="w-full btn btn-primary"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-white">
                    {user?.username || 'Anonymous User'}
                  </h3>
                  <p className="text-dark-600 mt-1">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
                </>
              )}
            </div>
            
            <div className="border-t border-dark-300 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-dark-600">Wallet Address</h3>
                <button
                  onClick={() => copyToClipboard(account || '')}
                  className="text-primary-500 hover:text-primary-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="bg-dark-300 p-3 rounded-md flex justify-between items-center">
                <p className="text-dark-700 text-sm font-mono break-all">
                  {account || 'No wallet connected'}
                </p>
                {account && (
                  <a 
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 ml-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Wallet Balance */}
          <div className="card bg-dark-200 border border-dark-300 mt-6">
            <h2 className="text-lg font-semibold text-white mb-6">Wallet Balance</h2>
            
            <div className="bg-dark-300 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <p className="text-dark-600">Available for withdrawal</p>
                <p className="text-2xl font-bold text-white">{user?.earnings || 0} ETH</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="withdrawAmount" className="block text-sm font-medium text-dark-600 mb-1">
                Amount to withdraw
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="withdrawAmount"
                  step="0.0001"
                  min="0.0001"
                  max={user?.earnings || 0}
                  className="flex-1 input"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.0000"
                />
                <button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > (user?.earnings || 0)}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Withdraw
                </button>
              </div>
              <p className="text-xs text-dark-600 mt-1">
                Minimum withdrawal: 0.0001 ETH
              </p>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="lg:col-span-2">
          <div className="card bg-dark-200 border border-dark-300">
            <h2 className="text-lg font-semibold text-white mb-6">Transaction History</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-dark-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-300">
                  {mockTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-dark-600">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    mockTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full ${
                              tx.type === 'earning' ? 'bg-secondary-900/20' : 'bg-primary-900/20'
                            }`}>
                              {tx.type === 'earning' ? (
                                <DollarSign className={`h-4 w-4 ${
                                  tx.type === 'earning' ? 'text-secondary-500' : 'text-primary-500'
                                }`} />
                              ) : (
                                <Download className={`h-4 w-4 ${
                                  tx.type === 'earning' ? 'text-secondary-500' : 'text-primary-500'
                                }`} />
                              )}
                            </div>
                            <span className="ml-2 text-sm text-dark-700">
                              {tx.type === 'earning' ? 'Earning' : 'Withdrawal'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${
                            tx.type === 'earning' ? 'text-secondary-500' : 'text-primary-500'
                          }`}>
                            {tx.type === 'earning' ? '+' : '-'}{tx.amount} ETH
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-dark-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(tx.timestamp)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-900/20 text-secondary-500">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Account Statistics */}
          <div className="card bg-dark-200 border border-dark-300 mt-6">
            <h2 className="text-lg font-semibold text-white mb-6">Account Statistics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-dark-300 p-4 rounded-lg">
                <p className="text-dark-600 text-sm mb-1">Tasks Completed</p>
                <p className="text-2xl font-semibold text-white">12</p>
              </div>
              
              <div className="bg-dark-300 p-4 rounded-lg">
                <p className="text-dark-600 text-sm mb-1">Words Typed</p>
                <p className="text-2xl font-semibold text-white">4,850</p>
              </div>
              
              <div className="bg-dark-300 p-4 rounded-lg">
                <p className="text-dark-600 text-sm mb-1">Average Accuracy</p>
                <p className="text-2xl font-semibold text-white">96.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;