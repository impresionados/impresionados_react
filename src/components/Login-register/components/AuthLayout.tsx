import React from 'react';
import { Building2 } from 'lucide-react';

// Definimos las propiedades que acepta el layout
interface AuthLayoutProps {
  children: React.ReactNode; // Contenido dinámico que se mostrará dentro del layout
}

// Componente de diseño para las páginas de autenticación (Login, Registro)
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda con información sobre la empresa */}
      <div className="w-1/2 bg-indigo-700 p-12 text-white flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Building2 size={32} />
            <h1 className="text-3xl font-bold">CompanyName</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-6">Sobre nosotros</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Somos una empresa innovadora dedicada a proporcionar soluciones creativas.
          </p>
          <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Equipo de trabajo"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="w-px bg-gray-200"></div>

      {/* Sección derecha donde se mostrará el formulario de login o registro */}
      <div className="w-1/2 bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
