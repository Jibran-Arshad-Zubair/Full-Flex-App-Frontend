import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function App() {
   const [socket ,setSocket] = useState(null);

   const authUser = useSelector((state) => state.user.authUser);

useEffect(() => {
  if (authUser) {
    console.log("Attempting socket connection...");
    
    const newSocket = io("http://localhost:5000", {
      path: "/socket.io/",
      transports: ["websocket"], // Force WebSocket only first
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd" // Helps debug if headers are received
      }
    });

    // Debugging events
    newSocket.on("connect", () => {
      console.log("🔥 Socket connected! ID:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection failed:", err.message);
      console.error("Error details:", err);
      
      // Fallback to polling if websocket fails
      if (err.message.includes("websocket error")) {
        console.log("🔄 Trying polling fallback...");
        newSocket.io.opts.transports = ["polling", "websocket"];
      }
    });

    newSocket.on("disconnect", (reason) => {
      console.log("💤 Disconnected:", reason);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }
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