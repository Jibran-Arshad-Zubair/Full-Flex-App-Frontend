import { FiBarChart2, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useGetAllCoursesQuery } from '../../Redux/queries/course/courseApi';
import {  AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,} from 'recharts';
import { useState, useMemo } from 'react';
const DashboardChart = () => {
  const [chartType, setChartType] = useState('area'); 
  const { data: allCourses, isLoading } = useGetAllCoursesQuery();
  const authUser = useSelector((state) => state.user.authUser);
  const userId = authUser?.user?._id;

  const myCourses = useMemo(() => {
    return allCourses?.data?.filter(
      (course) => course.teacher._id === userId
    ) || [];
  }, [allCourses?.data, userId]);

  
  const chartData = useMemo(() => {
    const coursesByMonth = {};
    const now = new Date();
    
   
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleString('default', { month: 'short' });
      coursesByMonth[monthKey] = {
        name: monthKey,
        'Active Courses': 0,
        'Pending Courses': 0,
        'Total Students': 0,
      };
    }

    myCourses.forEach((course) => {
      const courseDate = new Date(course.createdAt);
      const monthKey = courseDate.toLocaleString('default', { month: 'short' });
      
      if (coursesByMonth[monthKey]) {
        if (course.status === 'active') {
          coursesByMonth[monthKey]['Active Courses']++;
        } else if (course.status === 'pending') {
          coursesByMonth[monthKey]['Pending Courses']++;
        }
        coursesByMonth[monthKey]['Total Students'] += course.students?.length || 0;
      }
    });

    return Object.values(coursesByMonth);
  }, [myCourses]);


  const pieData = useMemo(() => {
    const active = myCourses.filter(c => c.status === 'active').length;
    const pending = myCourses.filter(c => c.status === 'pending').length;
    return [
      { name: 'Active Courses', value: active },
      { name: 'Pending Courses', value: pending },
    ];
  }, [myCourses]);

  const COLORS = ['#4F46E5', '#10B981'];

  return (
    <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <div className="px-6 pt-5 pb-2 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2 text-blue-500" />
            Course Analytics
          </h3>
          <div className="flex space-x-2">
            <button 
              className={`p-1.5 rounded-lg border border-gray-200 transition-colors ${
                chartType === 'area' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
              onClick={() => setChartType('area')}
            >
              <FiBarChart2 />
            </button>
            <button 
              className={`p-1.5 rounded-lg border border-gray-200 transition-colors ${
                chartType === 'pie' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
              onClick={() => setChartType('pie')}
            >
              <FiPieChart />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Last 6 months overview</p>
      </div>

      <div className="relative h-[300px] p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : chartType === 'area' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Active Courses"
                stackId="1"
                stroke="#4F46E5"
                fill="#4F46E5"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="Pending Courses"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="Total Students"
                stroke="#6366F1"
                fill="#6366F1"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="px-6 py-3 border-t border-gray-200/50 bg-white/50 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Total Courses: </span>
          <span className="font-medium text-blue-600">{myCourses.length}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-500">Updated in real-time</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;