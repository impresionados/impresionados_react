import React from "react";
import { Link } from 'react-router-dom';

import "./Footer.css"; // Asegúrate de importar el CSS

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Impresionados 3D</p>
        <Link to={"/FAQP"} className="faqp">
          <div className="faqp">Preguntas frecuentes</div>
        </Link>      
      </div>
    </footer>
  );
};