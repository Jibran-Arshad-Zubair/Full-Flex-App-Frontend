export default function PaymentSuccess({ details }) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">Payment Successful!</h2>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Amount: ${details.amount.toFixed(2)}</p>
        <p>Transaction ID: {details.id}</p>
        <p>Date: {details.date.toLocaleString()}</p>
      </div>
      <a 
        href="/" 
        className="inline-block mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Return to Home
      </a>
    </div>
  );
}