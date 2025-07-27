import { useState } from 'react';
import CheckoutForm from '../components/payments/CheckoutForm';
import PaymentSuccess from '../components/payments/PaymentSuccess';

export default function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Payment</h1>
          
          {paymentStatus === 'succeeded' ? (
            <PaymentSuccess details={paymentDetails} />
          ) : (
            <CheckoutForm 
              onSuccess={(details) => {
                setPaymentStatus('succeeded');
                setPaymentDetails(details);
              }}
              onError={() => setPaymentStatus('failed')}
            />
          )}
        </div>
      </div>
    </main>
  );
}