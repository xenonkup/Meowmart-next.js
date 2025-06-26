import { Toaster } from 'react-hot-toast';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main>
        {children}
        <Toaster position="top-center"/>
      </main>
    </div>
  );
}
