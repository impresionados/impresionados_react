import React, { useEffect, useState } from "react";
import "./Filter.css";
import { Filter } from "lucide-react";

interface FiltersProps {
  onFilterChange: (selectedFilters: { [key: string]: string[] }) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const cachedFilters = localStorage.getItem("filters_data");

      if (cachedFilters) {
        console.log("✅ Cargando filtros desde caché");
        setFilters(JSON.parse(cachedFilters));
        return;
      }

      console.log("🔄 Realizando petición a la API...");
      try {
        const response = await fetch("http://10.102.10.15:8001/supertypes_with_types/");
        if (!response.ok) throw new Error("Error al obtener los filtros");

        const data = await response.json();
        setFilters(data);

        // Guardar en caché
        localStorage.setItem("filters_data", JSON.stringify(data));
      } catch (error) {
        console.error("❌ Error al obtener filtros:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleCheckboxChange = (supertype: string, type: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };

      if (!updatedFilters[supertype]) {
        updatedFilters[supertype] = [];
      }

      if (updatedFilters[supertype].includes(type)) {
        updatedFilters[supertype] = updatedFilters[supertype].filter((t) => t !== type);
      } else {
        updatedFilters[supertype].push(type);
      }

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <>
      <button className="filters-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Filter />
      </button>

      {isOpen && (
        <div className="filters-container">
          <div className="filters-grid">
            {Object.entries(filters).map(([supertype, types]) => (
              <div key={supertype} className="filter-category">
                <h3 className="filter-title">{supertype}</h3>
                <ul className="filter-list">
                  {types.map((type) => (
                    <li key={type} className="filter-item">
                      <label className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedFilters[supertype]?.includes(type) || false}
                          onChange={() => handleCheckboxChange(supertype, type)}
                        />
                        {type}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
