// FilterPanel.tsx
import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface FilterPanelProps {
  filters: { company: string; quoteNo: string };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  handleFilterChange,
  clearFilters,
}) => (
  <div className="px-4 py-2 bg-white shadow-md z-10 sticky top-0">
    <h3 className="text-lg font-semibold mb-3 text-gray-700">Filters</h3>
    <div className="flex items-center gap-4">
      <FilterInput
        name="company"
        placeholder="Filter by company"
        value={filters.company}
        onChange={handleFilterChange}
      />
      <FilterInput
        name="quoteNo"
        placeholder="Filter by quote number"
        value={filters.quoteNo}
        onChange={handleFilterChange}
      />
      <button
        onClick={clearFilters}
        className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center"
      >
        <FaTimes className="mr-2" />
        Clear Filters
      </button>
    </div>
  </div>
);

const FilterInput: React.FC<{
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, placeholder, value, onChange }) => (
  <div className="relative flex-1">
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
    />
    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

export default FilterPanel;
