import React, { forwardRef } from "react";
import { Filter } from "lucide-react";
import "./FilterButton.css";

interface FilterButtonProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(({ isOpen, setIsOpen }, ref) => {
  return (
    <button ref={ref} className="filters-toggle" onClick={() => setIsOpen(!isOpen)}>
      <Filter />
    </button>
  );
});
