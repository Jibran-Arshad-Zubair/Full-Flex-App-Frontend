
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import CheckoutPage from '../pages/CheckoutPage';
import ChatPage from '../pages/ChatPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}
