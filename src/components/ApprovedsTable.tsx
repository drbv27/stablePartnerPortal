// components/ApprovedsTable.tsx
"use client";
import React from "react";
import { useApprovedsTable } from "../hooks/useApprovedsTable";
import FilterPanel from "@/components/contracts/approved/FilterPanel";
import ApprovedQuoteRow from "@/components/contracts/approved/ApprovedQuoteRow";

const ApprovedsTable: React.FC<{ quotes: any[] }> = ({ quotes }) => {
  const { filteredQuotes, companyFilter, handleFilterChange, clearFilter } =
    useApprovedsTable(quotes);

  if (filteredQuotes.length === 0) {
    return <div>No quotes available for approval</div>;
  }

  return (
    <div className="flex flex-col h-[90vh] bg-slate-200 w-[82vw] ml-1 shadow-xl rounded-xl overflow-hidden">
      <FilterPanel
        companyFilter={companyFilter}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 w-full bg-orange-700 flex justify-between px-4 py-2 font-semibold text-white">
          <div className="w-[70%]">Company</div>
          <div className="w-[20%] text-center">Status</div>
          <div className="w-[10%] text-right">Actions</div>
        </div>
        <div className="bg-white">
          {filteredQuotes.map((quote: any) => (
            <ApprovedQuoteRow key={quote._id} quote={quote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovedsTable;
