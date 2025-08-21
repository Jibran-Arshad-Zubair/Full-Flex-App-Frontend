
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import CheckoutPage from '../pages/CheckoutPage';
import ChatPage from '../pages/ChatPage';
import ProfilePage from '../pages/ProfilePage';
import ComingSoonPage from '../components/dashboard/ComingSoonPage';
import CoursesPage from '../pages/CoursesPage';
import CourseDetailsPage from '../pages/CourseDetailsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/course" element={< CoursesPage/>} />
      <Route path="/payments" element={<ComingSoonPage />} />
      <Route path="/course-details/:courseId" element={<CourseDetailsPage/>} />

      
    </Routes>
  );
}
