import React from 'react';
import { Wallet, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 border-t border-dark-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">CryptoType</span>
            </div>
            <p className="mt-4 text-dark-500 max-w-md">
              Earn real Ethereum by typing. Our platform rewards your typing skills with cryptocurrency, distributing rewards fairly between users and content creators.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-dark-600 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  Smart Contract
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-dark-600 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-500 hover:text-primary-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-300">
          <div className="flex justify-between items-center">
            <p className="text-dark-500 text-sm">
              &copy; {new Date().getFullYear()} CryptoType. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-dark-500 hover:text-primary-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-primary-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-primary-500">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;