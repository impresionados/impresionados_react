import { useState } from "react";
import { motion } from "framer-motion";
import "./FAQItem.css";
import { ChevronDown } from "lucide-react";

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
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="faq-answer"
        >
          {faq.answer}
        </motion.div>
      )}
    </div>
  );
}
