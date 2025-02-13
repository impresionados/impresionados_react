import React, { useEffect, useState, useRef } from "react";
import "./Filter.css";
import { FilterButton } from "./FilterButton";
import { FilterList } from "./FilterList";

interface FiltersProps {
  onFilterChange: (selectedFilters: { [key: string]: string[] }) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>(() => {
    const savedFilters = localStorage.getItem("selected_filters");
    return savedFilters ? JSON.parse(savedFilters) : {};
  });
  const [isOpen, setIsOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null); // ✅ Referencia al contenedor de filtros
  const toggleButtonRef = useRef<HTMLButtonElement>(null); // ✅ Referencia al botón de filtros

  useEffect(() => {
    const fetchFilters = async () => {
      const cachedFilters = localStorage.getItem("filters_data");
      if (cachedFilters) {
        setFilters(JSON.parse(cachedFilters));
        return;
      }

      try {
        const response = await fetch("http://10.102.10.35:8001/supertypes_with_types/");
        if (!response.ok) throw new Error("Error al obtener los filtros");

        const data = await response.json();
        setFilters(data);
        localStorage.setItem("filters_data", JSON.stringify(data));
      } catch (error) {
        console.error("❌ Error al obtener filtros:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleCheckboxChange = (supertype: string, type: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      updatedFilters[supertype] = updatedFilters[supertype]?.includes(type)
        ? updatedFilters[supertype].filter((t) => t !== type)
        : [...(updatedFilters[supertype] || []), type];

      localStorage.setItem("selected_filters", JSON.stringify(updatedFilters));
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  // ✅ Cierra los filtros si se hace clic fuera de ellos, excepto si se hace clic en el botón de filtros
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current && !filtersRef.current.contains(event.target as Node) &&
        toggleButtonRef.current && !toggleButtonRef.current.contains(event.target as Node) // EXCEPCIÓN para el botón
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} ref={toggleButtonRef} />
      {isOpen && (
        <div className="filters-container" ref={filtersRef}>
          <FilterList filters={filters} selectedFilters={selectedFilters} handleCheckboxChange={handleCheckboxChange} />
        </div>
      )}
    </>
  );
};
