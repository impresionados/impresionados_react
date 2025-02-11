import FAQItem from "../../components/FAQP/FAQItem";
import "./FAQPage.css";

interface FAQ {
  question: string;
  answer: string;
}

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

export default function FAQPage() {
  return (
    <div className="faq-container">
      <h1 className="faq-title">Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
}
