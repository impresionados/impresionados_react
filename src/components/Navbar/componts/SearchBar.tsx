import { Filter } from 'lucide-react';

export const SearchBar: React.FC = () => {
  return (
    <div className="search-wrapper">
      <Filter className="icon" />
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar productos..."
      />
    </div>
  );
};
