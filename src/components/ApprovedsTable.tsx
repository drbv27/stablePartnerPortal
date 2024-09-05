"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaSearch, FaTimes } from "react-icons/fa";
import { deleteQuote } from "@/actions/quotes/quotes-actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ApprovedsTable = (quotes: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [companyFilter, setCompanyFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyFilter(e.target.value);
  };

  const clearFilter = () => {
    setCompanyFilter("");
  };

  const handleDelete = async (id: string) => {
    await deleteQuote(id);
    router.push("/manageQuote");
  };

  // Redirect if not admin
  if ((session?.user as any)?.role !== "admin") {
    router.push("/dashboard/main");
    return null;
  }

  const filteredQuotes = quotes.quotes
    ? quotes.quotes
        .filter(
          (quote: any) =>
            quote.status === "signed" &&
            quote.company?.companyName
              .toLowerCase()
              .includes(companyFilter.toLowerCase())
        )
        .sort((a: any, b: any) => b.quoteNo - a.quoteNo)
    : [];

  return (
    <div className="flex flex-col h-[90vh] bg-slate-200 w-[82vw] ml-1 shadow-xl rounded-xl overflow-hidden">
      {/* Fixed Filter Panel */}
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

      {/* Scrollable Table Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 w-full bg-orange-700 flex justify-between px-4 py-2 font-semibold text-white">
          <div className="w-[70%]">Company</div>
          <div className="w-[20%] text-center">Status</div>
          <div className="w-[10%]">Actions</div>
        </div>

        <div className="bg-white">
          {filteredQuotes.map((quote: any) => (
            <div
              key={quote._id}
              className="flex justify-between px-4 py-2 border-b-2 border-orange-300"
            >
              <div className="w-[70%]">{quote.company?.companyName}</div>
              <div className="w-[20%] text-center font-semibold">
                {quote.status}
              </div>
              <div className="w-[10%] text-right flex justify-end">
                <Link
                  href={`/dashboard/aproveQuote/${quote._id}`}
                  className="text-xl text-orange-500 mr-1"
                >
                  <FaEye />
                </Link>
                {/* <button onClick={() => handleDelete(quote._id)} className="text-red-500 text-xl mr-1"><FaTrash /></button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovedsTable;
