"use client";
import React from "react";
import { useQuotesTable } from "../hooks/useQuotesTable";
import FilterPanel from "@/components/quotes/FilterPanel";
import QuoteRow from "@/components/quotes/QuoteRow";

const QuotesTable: React.FC<{ quotes: any[] }> = ({ quotes }) => {
  const { filteredQuotes, filters, handleFilterChange, clearFilters } =
    useQuotesTable(quotes);

  return (
    <div className="flex flex-col h-[90vh] bg-slate-200 w-[82vw] ml-1 shadow-xl rounded-xl overflow-hidden">
      <FilterPanel
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 w-full bg-orange-700 flex justify-between px-2 py-2 font-semibold text-white">
          <div className="w-[40%]">Company</div>
          <div className="w-[15%] text-center">Status</div>
          <div className="w-[15%]">No</div>
          <div className="w-[15%] text-right">Actions</div>
        </div>

        <div className="bg-white">
          {filteredQuotes.map((quote: any) => (
            <QuoteRow key={quote._id} quote={quote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuotesTable;
