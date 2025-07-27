export default function PaymentError() {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">Payment Failed</h2>
      <p className="text-sm text-gray-600">Please try again or use a different payment method.</p>
      <button 
        onClick={() => window.location.reload()}
        className="inline-block mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Try Again
      </button>
    </div>
  );
}