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
        if (selectedSubtypes.length > 0) {
            // ✅ Si hay subtipos seleccionados, los desmarcamos todos y también desmarcamos el supertipo
            selectedSubtypes.forEach(type => handleCheckboxChange(supertype, type));
        } else {
            // ✅ Si no hay subtipos seleccionados, activamos el supertipo
            handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
        }
    }
};



  const handleSubtypeCheckboxChange = (supertype: string, type: string) => {
    const selectedSubtypes = selectedFilters[supertype] || [];
    
    // ✅ Alternamos el estado del subtipo seleccionado
    handleCheckboxChange(supertype, type);

    // ✅ Si `__SUPER_TYPE_SELECTED__` está en la lista, lo eliminamos
    if (selectedSubtypes.includes("__SUPER_TYPE_SELECTED__")) {
        handleCheckboxChange(supertype, "__SUPER_TYPE_SELECTED__");
    }
};


  return (
    <div className="filters-grid">
      {Object.entries(filters).map(([supertype, types]) => {
        const selectedSubtypes = selectedFilters[supertype] || [];
        const isSupertypeSelected = selectedSubtypes.includes("__SUPER_TYPE_SELECTED__");
        const allSupertypesSelected = Object.keys(selectedFilters).length === 0;
        const isSupertypeChecked = isSupertypeSelected || selectedSubtypes.length > 0;

        return (
          <div key={supertype} className="filter-category">
            <label className="filter-option filter-title">
            <input
                type="checkbox"
                checked={isSupertypeChecked}
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
