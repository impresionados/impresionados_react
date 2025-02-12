// Importación de componentes y hojas de estilo
import FAQItem from "../../components/FAQP/FAQItem";
import "./FAQPage.css";

// Definición de la interfaz FAQ que especifica la estructura de un objeto de pregunta frecuente
interface FAQ {
  question: string;
  answer: string;
}

// Creación de un array de objetos FAQ con preguntas y respuestas predefinidas
const faqs: FAQ[] = [
  {
    question: "¿Cómo recupero la contraseña si me he olvidado?",
    answer: "Contacte con el servicio técnico para establecer una nueva contraseña: serviciotectnico@impresionados3d.es",
  },
  {
    question: "¿Cómo hacer la compra de un producto?",
    answer: "Añades el producto al carrito y le das al botón de comprar.",
  },
  {
    question: "¿No me cargan los productos?",
    answer: "Borre la caché, cierre y vuelva a entrar a la página. Si el error persiste, contacte con nuestro servicio técnico: serviciotectnico@impresionados3d.es.",
  },
];

// Definición del componente FAQPage que renderiza la página de Preguntas Frecuentes
export default function FAQPage() {
  return (
    <div className="faq-container">
      {/* Título de la página */}
      <h1 className="faq-title">Preguntas Frecuentes</h1>

      {/* Lista de preguntas frecuentes generada dinámicamente a partir del array faqs */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
}
