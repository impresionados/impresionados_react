import React from "react";
import "./FilterList.css";

interface FilterListProps {
  filters: { [key: string]: string[] };
  selectedFilters: { [key: string]: string[] };
  handleCheckboxChange: (supertype: string, type: string) => void;
}

export const FilterList: React.FC<FilterListProps> = ({ filters, selectedFilters, handleCheckboxChange }) => {
  
  const handleSupertypeCheckboxChange = (supertype: string) => {
    const selectedSubtypes = selectedFilters[supertype] || [];
    const isSupertypeSelected = selectedSubtypes.includes("__SUPER_TYPE_SELECTED__");

    if (isSupertypeSelected) {
        // ✅ Si el supertipo está seleccionado, lo desmarcamos junto con todos los subtipos
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
        selectedSubtypes.forEach(type => {
            if (type !== "__SUPER_TYPE_SELECTED__") {
                handleCheckboxChange(supertype, type);
            }
        });
    } else {
        // ✅ Si el supertipo NO está seleccionado, activamos solo el supertipo
        selectedSubtypes.forEach(type => handleCheckboxChange(supertype, type)); // Desmarcar subtipos
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
    }
};

const handleSubtypeCheckboxChange = (supertype: string, type: string) => {
    const selectedSubtypes = selectedFilters[supertype] || [];
    const isSupertypeSelected = selectedSubtypes.includes("__SUPER_TYPE_SELECTED__");

    // ✅ Alternamos el estado del subtipo seleccionado
    handleCheckboxChange(supertype, type);

    if (isSupertypeSelected) {
        // ✅ Si había `__SUPER_TYPE_SELECTED__`, lo quitamos al seleccionar un subtipo
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
    }

    // ✅ Si no queda ningún subtipo seleccionado, añadir `__SUPER_TYPE_SELECTED__` de nuevo
    setTimeout(() => {
        const updatedSubtypes = selectedFilters[supertype] || [];
        if (updatedSubtypes.length === 0) {
            handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
        }
    }, 0);
};



  return (
    <div className="filters-grid">
      {Object.entries(filters).map(([supertype, types]) => {
        const selectedSubtypes = selectedFilters[supertype] || [];
        const isSupertypeSelected = selectedSubtypes.includes("__SUPER_TYPE_SELECTED__");
        const allSubtypesSelected = types.every(type => selectedSubtypes.includes(type));
        const allSupertypesSelected = Object.keys(selectedFilters).length === 0;

        return (
          <div key={supertype} className="filter-category">
            <label className="filter-option filter-title">
              <input
                type="checkbox"
                checked={isSupertypeSelected || allSupertypesSelected}
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
