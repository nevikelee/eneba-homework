import React, { useState, useRef } from "react";
import { Search, X, ArrowLeft } from "lucide-react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchClick = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`search ${isOpen ? "mobile-open" : ""}`}
      onClick={handleSearchClick}
    >
      {isOpen && (
        <button type="button" className="backButton" onClick={handleBack}>
          <ArrowLeft size={24} color="#fff" />
        </button>
      )}

      <div className="iconWrapper searchIcon">
        <Search size={22} color="#fff" strokeWidth={3} />
      </div>

      <div className="inputContainer">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for games"
          className="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="iconWrapper">
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-btn clearButton"
          >
            <X size={26} strokeWidth={2} />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
