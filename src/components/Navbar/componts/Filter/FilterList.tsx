import React from "react";
import "./FilterList.css";

interface FilterListProps {
  filters: { [key: string]: string[] };
  selectedFilters: { [key: string]: string[] };
  handleCheckboxChange: (supertype: string, type: string) => void;
}

export const FilterList: React.FC<FilterListProps> = ({ filters, selectedFilters, handleCheckboxChange }) => {
  
  const handleSupertypeCheckboxChange = (supertype: string) => {
    const hasSelectedSubtypes = selectedFilters[supertype]?.some(type => type !== "__SUPER_TYPE_SELECTED__");
    const isSupertypeSelected = selectedFilters[supertype]?.includes("__SUPER_TYPE_SELECTED__");

    if (isSupertypeSelected) {
      // ✅ Si el supertipo ya estaba seleccionado, lo desmarcamos completamente
      filters[supertype].forEach(type => {
        if (selectedFilters[supertype]?.includes(type)) {
          handleCheckboxChange(supertype, type); // Desmarcar subtipos
        }
      });
      handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__"); // Desmarcar el supertipo
    } else if (hasSelectedSubtypes) {
      // ✅ Si hay subtipos seleccionados, eliminamos todos
      filters[supertype].forEach(type => {
        handleCheckboxChange(supertype, type);
      });
    } else {
      // ✅ Si no hay nada seleccionado, marcamos solo el supertipo
      handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
    }
  };

  return (
    <div className="filters-grid">
      {Object.entries(filters).map(([supertype, types]) => (
        <div key={supertype} className="filter-category">
          <label className="filter-option filter-title">
            <input
              type="checkbox"
              checked={selectedFilters[supertype]?.length > 0} // Se marca si tiene subtipos seleccionados o el supertipo
              onChange={() => handleSupertypeCheckboxChange(supertype)}
            />
            {supertype}
          </label>
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
  );
};
