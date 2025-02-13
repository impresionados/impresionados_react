import React from "react";
import "./FilterList.css";

interface FilterListProps {
  filters: { [key: string]: string[] };
  selectedFilters: { [key: string]: string[] };
  handleCheckboxChange: (supertype: string, type: string) => void;
}

export const FilterList: React.FC<FilterListProps> = ({ filters, selectedFilters, handleCheckboxChange }) => {
  
  const handleSupertypeCheckboxChange = (supertype: string) => {
    const isSupertypeSelected = selectedFilters[supertype]?.includes("__SUPER_TYPE_SELECTED__");
    const selectedSubtypes = selectedFilters[supertype] || [];

    if (isSupertypeSelected) {
        // ✅ Si el supertipo está seleccionado, lo desmarcamos junto con todos los subtipos
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
        filters[supertype].forEach(type => {
            if (selectedSubtypes.includes(type)) {
                handleCheckboxChange(supertype, type);
            }
        });
    } else {
        // ✅ Si el supertipo NO está seleccionado, lo activamos pero sin limpiar subtipos
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
    }
};

const handleSubtypeCheckboxChange = (supertype: string, type: string) => {
    const selectedSubtypes = selectedFilters[supertype] || [];
    const isSupertypeSelected = selectedSubtypes.includes("__SUPER_TYPE_SELECTED__");

    // ✅ Si el supertipo no estaba seleccionado, lo marcamos al seleccionar un subtipo
    if (!isSupertypeSelected) {
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
    }

    // ✅ Alternamos el estado del subtipo seleccionado
    handleCheckboxChange(supertype, type);
};


  return (
    <div className="filters-grid">
      {Object.entries(filters).map(([supertype, types]) => {
        const selectedSubtypes = selectedFilters[supertype] || [];
        const isSupertypeSelected = selectedSubtypes.includes("__SUPER_TYPE_SELECTED__");
        const allSubtypesSelected = types.every(type => selectedSubtypes.includes(type));

        return (
          <div key={supertype} className="filter-category">
            <label className="filter-option filter-title">
              <input
                type="checkbox"
                checked={isSupertypeSelected || allSubtypesSelected} 
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
                      onChange={() => handleSubtypeCheckboxChange(supertype, type)}
                    />
                    {type}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
