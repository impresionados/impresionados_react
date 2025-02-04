import './SuperCategoryFilters.css';


interface SuperCategoryFiltersProps {
  superCategories: { id: string; name: string }[];
  selectedSuperCategories: string[];
  onSuperCategorySelect: (superCategoryName: string) => void;
}

export const SuperCategoryFilters: React.FC<SuperCategoryFiltersProps> = ({
  superCategories,
  selectedSuperCategories,
  onSuperCategorySelect,
}) => {
  return (
    <div className="super-categories-container">
      <div className="title">Super categorías</div>
      {superCategories.map((superCategory) => (
        <button
          key={superCategory.id}
          onClick={() => onSuperCategorySelect(superCategory.name)}
          className={`super-category-button ${
            selectedSuperCategories.includes(superCategory.name)
              ? 'super-category-button-active'
              : ''
          }`}
        >
          {superCategory.name}
        </button>
      ))}
    </div>
  );
};
