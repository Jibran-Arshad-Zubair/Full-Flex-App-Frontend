export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
      disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}