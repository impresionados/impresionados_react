interface CategoryFiltersProps {
    categories: { _id: string; name: string }[];
    selectedCategories: string[];
    onCategorySelect: (categoryName: string) => void;
  }
  
  export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    categories,
    selectedCategories,
    onCategorySelect,
  }) => {
    return (
      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onCategorySelect(category.name)}
            className={`category-button ${
              selectedCategories.includes(category.name)
                ? 'category-button-active'
                : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  };
  