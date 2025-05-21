// User related types
export type UserRole = 'admin' | 'uploader' | 'user';

export interface User {
  id: string;
  address: string;
  role: UserRole;
  username: string | null;
  earnings: number;
  createdAt: string;
}

// Document types
export interface Document {
  id: string;
  title: string;
  content: string;
  uploadedBy: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
  createdAt: string;
}

// Typing task related types
export interface TypingTask {
  id: string;
  documentId: string;
  document: Document;
  userId: string;
  status: 'in-progress' | 'completed';
  accuracy: number;
  wordsTyped: number;
  earnedAmount: number;
  startedAt: string;
  completedAt: string | null;
}

// Typing statistics
export interface TypingStats {
  accuracy: number;
  wpm: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  elapsedTime: number;
}

// Transaction related types
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earning' | 'withdrawal';
  status: 'pending' | 'completed' | 'failed';
  txHash: string | null;
  createdAt: string;
}

// Earnings distribution
export interface EarningsDistribution {
  user: number;
  admin: number;
  total: number;
}

// Web3 related types
export interface EthereumWindow extends Window {
  ethereum?: any;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}