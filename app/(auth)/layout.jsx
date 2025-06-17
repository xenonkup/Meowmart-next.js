export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {children}
      </main>
    </div>
  );
}
