import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const { login, isAuthenticated, error, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const from = state?.from?.pathname || '/dashboard';
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleConnectWallet = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Wallet className="h-16 w-16 text-primary-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Connect your wallet
          </h2>
          <p className="mt-2 text-center text-sm text-dark-600">
            Connect your Ethereum wallet to access the typing platform and start earning cryptocurrency
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-error-900/20 border border-error-600 text-error-500 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div>
            <button
              onClick={handleConnectWallet}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect with MetaMask
                </span>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-dark-600">
              Don't have MetaMask?{' '}
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary-500 hover:text-primary-400"
              >
                Download here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;