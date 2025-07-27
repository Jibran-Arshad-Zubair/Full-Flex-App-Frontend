import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Button from '../ui/Button';
import { useCreatePaymentIntentMutation } from '../../Redux/queries/stripePayment/paymentApi';

export default function CheckoutForm({ onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
    
      const { clientSecret } = await createPaymentIntent({
        amount: 1099, 
        currency: 'pkr'
      }).unwrap();

     
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (stripeError) throw stripeError;
      
      onSuccess({
        amount: paymentIntent.amount / 100,
        id: paymentIntent.id,
        date: new Date(paymentIntent.created * 1000)
      });
    } catch (err) {
      setError(err.message);
      onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full"
      >
        {loading ? 'Processing...' : `Pay $10.99`}
      </Button>
    </form>
  );
}