import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./utils/socket";
import { setSocket } from "./Redux/reduxSlices/socketSlice";
import { setOnlineUsers } from "./Redux/reduxSlices/userSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const authUser = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      socket.connect();
      const query = {
        userId: authUser.user._id,
      };
      console.log("Queryyyy", query);
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers'), (onlineUsers) => {
        console.log("Online Users from socket", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      };
    } else {
      socket.disconnect();
    }

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
