import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useTyping } from '../hooks/useTyping';
import { useAuth } from '../hooks/useAuth';

// Mock data - in a real app, you would fetch the document from your API
const mockDocuments = {
  '1': {
    id: '1',
    title: 'Introduction to Blockchain Technology',
    content: `Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain.

Each block in the chain contains a number of transactions, and every time a new transaction occurs on the blockchain, a record of that transaction is added to every participant's ledger. The decentralized database managed by multiple participants is known as Distributed Ledger Technology (DLT).

Blockchain is a type of DLT in which transactions are recorded with an immutable cryptographic signature called a hash. This means if one block in one chain was changed, it would be immediately apparent it had been tampered with. If hackers wanted to corrupt a blockchain system, they would have to change every block in the chain, across all of the distributed versions of the chain.`,
    difficulty: 'easy',
    reward: 0.0005,
  },
  '2': {
    id: '2',
    title: 'Smart Contracts and DApps',
    content: `Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automatically enforce and execute the terms of an agreement when predetermined conditions are met. Smart contracts run on blockchain networks, primarily Ethereum, and enable trustless transactions without the need for intermediaries.

Decentralized applications (DApps) are digital applications that run on a blockchain network of computers instead of relying on a single computer. Because DApps are decentralized, they are free from the control and interference of a single authority. A DApp has its backend code running on a decentralized peer-to-peer network, unlike conventional apps where the backend code runs on centralized servers.

DApps can be developed for various purposes including finance, governance, social media, gaming, and more. They typically use tokens or cryptocurrencies as a means of accessing the application and incentivizing network participants.`,
    difficulty: 'medium',
    reward: 0.0012,
  },
  '3': {
    id: '3',
    title: 'The Future of Decentralized Finance',
    content: `Decentralized Finance, or DeFi, represents a paradigm shift in the financial industry, leveraging blockchain technology to recreate and improve upon traditional financial systems without the need for intermediaries like banks or brokers. By utilizing smart contracts on platforms like Ethereum, DeFi applications enable users to lend, borrow, trade, invest, and exchange assets in a trustless, permissionless manner.

The growth of DeFi has been exponential, with the total value locked (TVL) in DeFi protocols surging from less than $1 billion in early 2020 to over $100 billion in 2021. This rapid expansion demonstrates the increasing adoption and recognition of DeFi as a viable alternative to traditional financial services.

Key components of the DeFi ecosystem include decentralized exchanges (DEXs), lending and borrowing platforms, stablecoins, yield farming opportunities, insurance protocols, and asset management tools. These innovations are creating more inclusive, accessible, and efficient financial services available to anyone with an internet connection, regardless of geographical location or socioeconomic status.`,
    difficulty: 'hard',
    reward: 0.0020,
  },
  '4': {
    id: '4',
    title: 'Ethereum 2.0: The Merge and Beyond',
    content: `Ethereum 2.0, also known as Eth2 or Serenity, represents a major upgrade to the Ethereum network, transitioning from a proof-of-work (PoW) to a proof-of-stake (PoS) consensus mechanism. This transition, known as "The Merge," aims to make Ethereum more scalable, secure, and sustainable while maintaining its decentralized nature.

The Merge refers to the joining of the original Ethereum mainnet with the Beacon Chain, which introduced proof-of-stake to Ethereum. This eliminates the need for energy-intensive mining and instead secures the network using staked ETH. By switching to PoS, Ethereum reduces its energy consumption by approximately 99.95%, addressing one of the most significant criticisms of blockchain technology.

Beyond The Merge, Ethereum's roadmap includes several other important upgrades such as sharding, which will further improve scalability by splitting the network into multiple portions (shards) to spread the load. These enhancements will enable Ethereum to process thousands of transactions per second, making it more viable for everyday use cases and enterprise applications.`,
    difficulty: 'medium',
    reward: 0.0014,
  },
};

const TypingTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    const fetchDocument = async () => {
      // In a real app, you would fetch the document from your API
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (id && mockDocuments[id as keyof typeof mockDocuments]) {
          setDocument(mockDocuments[id as keyof typeof mockDocuments]);
        } else {
          throw new Error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocument();
  }, [id]);
  
  const handleTaskComplete = async (stats: any) => {
    // In a real app, you would send this data to your API to record the completion and reward the user
    console.log('Task completed with stats:', stats);
    
    // Simulate API delay for processing the completion
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // After successful recording, mark as completed
    setCompleted(true);
  };
  
  const { input, setInput, stats, isComplete, reset } = useTyping({
    text: document?.content || '',
    onComplete: handleTaskComplete,
  });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!document) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="h-12 w-12 text-error-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Document Not Found</h3>
        <p className="text-dark-600 mb-6">The document you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (completed || isComplete) {
    // Show completion screen
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-secondary-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Task Completed!</h2>
          <p className="text-xl text-dark-600 mb-8">
            Great job! You've earned {document.reward} ETH for completing this task.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="card bg-dark-200">
              <p className="text-dark-600 text-sm mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-white">{stats.accuracy.toFixed(1)}%</p>
            </div>
            <div className="card bg-dark-200">
              <p className="text-dark-600 text-sm mb-1">Words Per Minute</p>
              <p className="text-2xl font-bold text-white">{stats.wpm}</p>
            </div>
            <div className="card bg-dark-200">
              <p className="text-dark-600 text-sm mb-1">Time Spent</p>
              <p className="text-2xl font-bold text-white">{Math.floor(stats.elapsedTime / 60)}m {Math.floor(stats.elapsedTime % 60)}s</p>
            </div>
          </div>
          
          <div className="card bg-dark-200 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Earnings Distribution</h3>
            <div className="bg-dark-300 rounded-lg overflow-hidden h-4 mb-4">
              <div className="bg-primary-600 h-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-primary-500">Your Earnings (30%)</p>
                <p className="text-white font-semibold">{(document.reward * 0.3).toFixed(6)} ETH</p>
              </div>
              <div className="text-right">
                <p className="text-dark-600">Platform Share (70%)</p>
                <p className="text-dark-500 font-semibold">{(document.reward * 0.7).toFixed(6)} ETH</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => {
                reset();
                setCompleted(false);
              }}
              className="btn btn-outline"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render characters with different styling based on user input
  const renderText = () => {
    const chars = document.content.split('');
    
    return chars.map((char: string, index: number) => {
      // Determine character state
      let className = 'neutral'; // Default (not yet typed)
      
      if (index < input.length) {
        // This character has been typed
        className = input[index] === char ? 'correct' : 'incorrect';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-dark-600 hover:text-white flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="card bg-dark-200 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">{document.title}</h2>
            <p className="text-dark-600">Type the text below accurately to earn {document.reward} ETH</p>
          </div>
          
          <div className="flex items-center bg-dark-300 py-1 px-3 rounded-full">
            <Clock className="h-4 w-4 text-dark-600 mr-1" />
            <span className="text-dark-600 text-sm">{Math.floor(stats.elapsedTime / 60)}m {Math.floor(stats.elapsedTime % 60)}s</span>
          </div>
        </div>
        
        <div className="bg-dark-300 p-4 sm:p-6 rounded-lg mb-6">
          <div className="font-mono text-lg leading-relaxed text-dark-600 whitespace-pre-wrap">
            {renderText()}
            <span className="typing-cursor"></span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-dark-600 text-sm">Accuracy</p>
            <p className="text-xl font-semibold text-white">{stats.accuracy.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-dark-600 text-sm">WPM</p>
            <p className="text-xl font-semibold text-white">{stats.wpm}</p>
          </div>
          <div>
            <p className="text-dark-600 text-sm">Progress</p>
            <p className="text-xl font-semibold text-white">{Math.round((input.length / document.content.length) * 100)}%</p>
          </div>
          <div>
            <p className="text-dark-600 text-sm">Reward</p>
            <p className="text-xl font-semibold text-secondary-500">{document.reward} ETH</p>
          </div>
        </div>
        
        <div className="bg-dark-300 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary-600 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(input.length / document.content.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 bg-dark-300 border border-dark-400 rounded-lg text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
          placeholder="Start typing to earn rewards..."
          rows={5}
          autoFocus
        ></textarea>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={reset}
          className="btn btn-outline"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Reset
        </button>
        
        <div className="text-dark-600 text-sm">
          <p>Your progress is automatically saved while typing.</p>
        </div>
      </div>
    </div>
  );
};

export default TypingTask;