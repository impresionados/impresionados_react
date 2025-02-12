// Importa React para el componente funcional
import React from "react";
// Importa `Link` de React Router para la navegación interna
import { Link } from 'react-router-dom';

// Importa los estilos CSS del footer
import "./Footer.css"; 

// Componente funcional del footer
export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Texto con el nombre de la empresa y el año actual */}
        <p className="impresionados">© {new Date().getFullYear()} Impresionados 3D</p> 

        {/* Sección con los nombres de los autores/desarrolladores */}
        <div className="authors">
          <div className="author">Nicolás David Gilbert González</div>
          <div className="author">Aitor Sánchez</div>
          <div className="author">Óscar Machado Pérez</div>   
        </div>

        {/* Enlace a la página de Preguntas Frecuentes */}
        <Link to={"/FAQP"} className="faqp">
          <div className="faqp">Preguntas frecuentes</div>
        </Link>  
      </div>
    </footer>
  );
};
