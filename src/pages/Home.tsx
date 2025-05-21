import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Keyboard, DollarSign, Wallet, Users, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Earn <span className="text-primary-500">Ethereum</span> by Typing
              </h1>
              <p className="mt-6 text-xl text-dark-600">
                Turn your typing skills into cryptocurrency. Type documents, earn rewards, and get paid in real Ethereum.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn btn-primary text-lg py-3 px-8">
                  Start Earning
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href="#how-it-works" className="btn btn-outline text-lg py-3 px-8">
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-75 animate-pulse-slow"></div>
              <div className="relative bg-dark-200 p-6 rounded-lg shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-600">Current Reward Rate</p>
                      <p className="text-3xl font-bold text-white">0.0001 ETH</p>
                      <p className="text-dark-500 text-sm">per 100 correct words</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-primary-500" />
                  </div>
                  <div className="border-t border-dark-300 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-600">Active Typists</p>
                        <p className="text-3xl font-bold text-white">2,457</p>
                      </div>
                      <Users className="h-12 w-12 text-secondary-500" />
                    </div>
                  </div>
                  <div className="border-t border-dark-300 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-600">ETH Distributed</p>
                        <p className="text-3xl font-bold text-white">125.78 ETH</p>
                      </div>
                      <Wallet className="h-12 w-12 text-accent-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-dark-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-xl text-dark-600 max-w-2xl mx-auto">
              Our platform makes it easy to earn cryptocurrency through typing. Follow these simple steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-dark-600">
                Connect your Ethereum wallet to our platform to start earning and receiving crypto payments directly.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-secondary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Keyboard className="h-8 w-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Type Documents</h3>
              <p className="text-dark-600">
                Select documents to type from our library. Type accurately to maximize your crypto earnings.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-accent-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Earn Ethereum</h3>
              <p className="text-dark-600">
                Get paid automatically in Ethereum. 30% goes to you, while 70% supports the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Platform Features</h2>
            <p className="mt-4 text-xl text-dark-600 max-w-2xl mx-auto">
              Our platform is designed to provide a seamless experience for both typists and content creators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-primary-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-500" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white mb-2">Real-time Feedback</h3>
                <p className="text-dark-600">
                  Get instant feedback on your typing accuracy with color-coded text. Green for correct, red for errors.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-primary-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-500" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white mb-2">Smart Contracts</h3>
                <p className="text-dark-600">
                  Transparent, automated payment distribution through Ethereum smart contracts for security and trust.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-primary-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-500" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white mb-2">Document Library</h3>
                <p className="text-dark-600">
                  Access a diverse collection of documents uploaded by our content creators across various topics and difficulty levels.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-primary-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-500" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white mb-2">Performance Analytics</h3>
                <p className="text-dark-600">
                  Track your typing speed, accuracy, and earnings over time with detailed performance analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-dark-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Earning?</h2>
          <p className="mt-6 text-xl text-dark-600">
            Connect your wallet now and join thousands of others who are earning Ethereum through typing.
          </p>
          <div className="mt-10">
            <Link to="/login" className="btn btn-primary text-lg py-3 px-8">
              Connect Wallet & Start
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;