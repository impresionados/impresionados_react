import React from "react";
import { Link } from 'react-router-dom';

import "./Footer.css"; // Asegúrate de importar el CSS

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="impresionados">© {new Date().getFullYear()} Impresionados 3D</p> 
        <div className="authors">
          <div className="author">Nicolás David Gilbert González</div>
          <div className="author">Aitor Sánchez</div>
          <div className="author">Óscar Machado Pérez</div>   
        </div>
        <Link to={"/FAQP"} className="faqp">
          <div className="faqp">Preguntas frecuentes</div>
        </Link>  
      </div>
    </footer>
  );
};