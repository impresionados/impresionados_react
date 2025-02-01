import React from 'react';
import { Building2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - About Us */}
      <div className="w-1/2 bg-indigo-700 p-12 text-white flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Building2 size={32} />
            <h1 className="text-3xl font-bold">CompanyName</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-6">About Us</h2>
          <p className="text-lg leading-relaxed opacity-90">
            We are a forward-thinking company dedicated to providing innovative solutions
            for our clients. With years of experience and a passionate team, we strive
            to deliver excellence in everything we do.
          </p>
          <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-200"></div>

      {/* Right side - Auth Forms */}
      <div className="w-1/2 bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;