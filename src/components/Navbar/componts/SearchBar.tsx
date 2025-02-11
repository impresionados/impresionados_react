interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {  
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar productos..."
        value={searchQuery} // ✅ Usa el valor del estado
        onChange={(e) => setSearchQuery(e.target.value)} // ✅ Actualiza el estado
        aria-label="Buscar productos"
      />
    </div>
  );
};
