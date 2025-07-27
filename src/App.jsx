import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './pages/CheckoutPage';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50">
        <CheckoutPage />
      </div>
    </Elements>
  );
}