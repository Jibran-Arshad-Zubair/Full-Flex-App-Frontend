import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { socket } from './utils/socket';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const authUser = useSelector((state) => state.user.authUser);

  useEffect(() => {
    if (authUser) {
      // Connect socket when user is authenticated
      socket.connect();
    } else {
      // Disconnect socket when user is not authenticated
      socket.disconnect();
    }

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [authUser]);

  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <div className="min-h-screen bg-gray-100">
          <AppRoutes />
        </div>
      </Elements>
    </BrowserRouter>
  );
}