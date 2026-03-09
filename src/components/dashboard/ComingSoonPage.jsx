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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`p-4 sm:ml-64 mt-14 transition-all duration-200 ${sidebarOpen ? 'ml-64 sm:ml-64' : ''}`}>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6">
          <div className="text-center max-w-2xl mx-auto">
            {/* Icon Header */}
            <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-6">
              <FiClock className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Coming Soon
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We're working hard to bring you an amazing new feature. Stay tuned!
            </p>

            {/* Animated icons */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <div className="animate-pulse flex justify-center">
                <div className="flex space-x-4">
                  <FiCode className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                  <FiLayers className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  <FiServer className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                  <FiSmartphone className="w-8 h-8 text-pink-500 dark:text-pink-400" />
                  <FiDatabase className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                </div>
              </div>
            </div>

            {/* Optional CTA */}
            {/* <button
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              onClick={() => alert('Stay tuned!')}
            >
              Notify Me
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;