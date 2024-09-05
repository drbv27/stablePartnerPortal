import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface FilterPanelProps {
  filters: {
    company: string;
    status: string;
    quoteNo: string;
  };
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  clearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  handleFilterChange,
  clearFilters,
}) => (
  <div className="px-4 py-2 bg-white shadow-md z-10">
    <h3 className="text-lg font-semibold mb-1 text-gray-700">Filters</h3>
    <div className="flex flex-wrap gap-4">
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="text"
          name="company"
          placeholder="Filter by company"
          value={filters.company}
          onChange={handleFilterChange}
          className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="relative flex-1 min-w-[200px]">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 focus:outline-none focus:border-orange-500 transition-colors appearance-none bg-transparent"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="accept">Accept</option>
          <option value="reject">Reject</option>
          <option value="signed">Signed</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="text"
          name="quoteNo"
          placeholder="Filter by quote number"
          value={filters.quoteNo}
          onChange={handleFilterChange}
          className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <button
        onClick={clearFilters}
        className="px-4 py-1 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center"
      >
        <FaTimes className="mr-2" />
        Clear Filters
      </button>
    </div>
  </div>
);

export default FilterPanel;
