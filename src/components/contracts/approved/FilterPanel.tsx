// components/FilterPanel.tsx
import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface FilterPanelProps {
  companyFilter: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFilter: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  companyFilter,
  handleFilterChange,
  clearFilter,
}) => (
  <div className="px-4 py-2 bg-white shadow-md z-10">
    <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter</h3>
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          name="company"
          placeholder="Filter by company"
          value={companyFilter}
          onChange={handleFilterChange}
          className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <button
        onClick={clearFilter}
        className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center"
      >
        <FaTimes className="mr-2" />
        Clear Filter
      </button>
    </div>
  </div>
);

export default FilterPanel;
