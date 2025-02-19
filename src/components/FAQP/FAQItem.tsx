import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./FAQItem.css";

interface FAQProps {
  faq: {
    question: string;
    answer: string;
  };
}

export default function FAQItem({ faq }: FAQProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <h2>{faq.question}</h2>
        <ChevronDown className={`icon ${open ? "rotate" : ""}`} />
      </div>

      {/* 🔥 Se agregó `AnimatePresence` para permitir la animación de salida */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } }} // 🔥 Suaviza el cierre
            transition={{ duration: 0.3, ease: "easeInOut" }} // 🔥 Suaviza la apertura
            className="faq-answer"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
