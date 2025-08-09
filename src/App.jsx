import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './pages/CheckoutPage';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export default function App() {
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