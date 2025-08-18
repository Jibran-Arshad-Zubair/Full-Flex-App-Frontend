import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ReactLenis from 'react-lenis';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function App() {
   const [socket ,setSocket] = useState(null);

   const authUser = useSelector((state) => state.user.authUser);

   useEffect(() => {
    if(authUser){
     const newSocket = io('http://localhost:5000',{
      
     });
     setSocket(newSocket);
    }
   },[authUser]);

  return (
    <ReactLenis
    root
    options={{
      lerp: 0.1,
      duration:1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      
    }}>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
        <div className="min-h-screen bg-gray-100">
          <AppRoutes />
        </div>
      </Elements>
    </BrowserRouter>
    </ReactLenis>
   
  );
}