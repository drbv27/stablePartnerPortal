"use client";
import React from "react";
import { useContractsTable } from "@/hooks/useContractsTable";
import FilterPanel from "@/components/contracts/FilterPanel";
import ContractsTableHeader from "@/components/contracts/ContractsTableHeader";
import ContractsTableRow from "@/components/contracts/ContractsTableRow";

const ContractsTable: React.FC<{ quotes: any[] }> = ({ quotes }) => {
  const { filteredQuotes, filters, handleFilterChange, clearFilters } =
    useContractsTable(quotes);

  if (!quotes || quotes.length === 0) {
    return <div>No quotes available</div>;
  }

  return (
    <div className="flex flex-col h-[93vh] bg-slate-200 w-[84vw] ml-1 shadow-xl rounded-xl overflow-hidden">
      <FilterPanel
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <ContractsTableHeader />
          <tbody className="bg-white">
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote: any) => (
                <ContractsTableRow key={quote._id} quote={quote} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No quotes found matching the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractsTable;
