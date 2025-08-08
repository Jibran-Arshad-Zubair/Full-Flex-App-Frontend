import { FiBarChart2, FiTrendingUp, FiPieChart } from 'react-icons/fi';

const DashboardChart = () => {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
  
      <div className="px-6 pt-5 pb-2 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2 text-blue-500" />
            Performance Analytics
          </h3>
          <div className="flex space-x-2">
            <button className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50 transition-colors">
              <FiBarChart2 className="text-gray-600" />
            </button>
            <button className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50 transition-colors">
              <FiPieChart className="text-gray-600" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Last 30 days overview</p>
      </div>

   
      <div className="relative h-64 p-4 flex items-center justify-center">
      
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-blue-100/50 blur-xl"></div>
          <div className="absolute right-10 bottom-0 w-40 h-40 rounded-full bg-indigo-100/50 blur-xl"></div>
        </div>

      
        <div className="relative w-full h-full">
         
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 h-4/5">
            {[30, 60, 45, 80, 65, 90, 50, 75, 60, 85].map((height, index) => (
              <div 
                key={index}
                className="relative w-8 flex flex-col items-center group"
              >
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ease-out ${index % 3 === 0 ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 'bg-gradient-to-t from-indigo-500 to-indigo-400'}`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1 text-xs font-medium bg-gray-800 text-white rounded whitespace-nowrap">
                    ${height * 100}
                  </div>
                </div>
                <span className="absolute -bottom-6 text-xs text-gray-500">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W'][index]}
                </span>
              </div>
            ))}
          </div>

          
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="border-t border-r border-gray-200/30"></div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="px-6 py-3 border-t border-gray-200/50 bg-white/50 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Total: </span>
          <span className="font-medium text-blue-600">$24,560</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="flex items-center text-green-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +12.5%
          </span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;