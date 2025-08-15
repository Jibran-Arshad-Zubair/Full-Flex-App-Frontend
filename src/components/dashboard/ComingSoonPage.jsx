import React from 'react';
import { FiClock, FiCode, FiLayers, FiServer, FiSmartphone, FiDatabase } from 'react-icons/fi';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


const ComingSoonPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`p-4 sm:ml-64 mt-14 transition-all duration-200 ${sidebarOpen ? 'ml-64' : ''}`}>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6">
       
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full mb-6">
              <FiClock className="w-12 h-12 text-indigo-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Coming Soon
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              We're working hard to bring you an amazing new feature. Stay tuned!
            </p>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="animate-pulse flex justify-center">
                <div className="flex space-x-4">
                  <FiCode className="w-8 h-8 text-indigo-500" />
                  <FiLayers className="w-8 h-8 text-blue-500" />
                  <FiServer className="w-8 h-8 text-purple-500" />
                  <FiSmartphone className="w-8 h-8 text-pink-500" />
                  <FiDatabase className="w-8 h-8 text-teal-500" />
                </div>
              </div>
            </div>
            
            <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Want to be notified when we launch?
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;