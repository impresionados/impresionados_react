// Importa el hook `useState` para manejar el estado del componente
import { useState } from "react";
// Importa `motion` de Framer Motion para agregar animaciones
import { motion } from "framer-motion";
// Importa los estilos CSS del componente
import "./FAQItem.css";
// Importa el icono ChevronDown desde Lucide React
import { ChevronDown } from "lucide-react";

// Definimos la interfaz de las propiedades que recibirá el componente
interface FAQProps {
  faq: {
    question: string; // Pregunta de la FAQ
    answer: string;   // Respuesta de la FAQ
  };
}

// Componente que representa un ítem de FAQ (Pregunta Frecuente)
export default function FAQItem({ faq }: FAQProps) {
  // Estado para controlar si la respuesta está abierta o cerrada
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      {/* Contenedor de la pregunta, permite hacer clic para abrir/cerrar */}
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <h2>{faq.question}</h2>
        {/* Icono de flecha que rota cuando se abre la respuesta */}
        <ChevronDown className={`icon ${open ? "rotate" : ""}`} />
      </div>

      {/* Si `open` es verdadero, muestra la respuesta con animación */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} // Estado inicial (oculto)
          animate={{ opacity: 1, height: "auto" }} // Estado cuando se muestra
          exit={{ opacity: 0, height: 0 }} // Estado cuando se oculta
          className="faq-answer"
        >
          {faq.answer}
        </motion.div>
      )}
    </div>
  );
}
