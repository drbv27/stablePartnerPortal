"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaSearch, FaTimes } from "react-icons/fa";
import { deleteQuote } from "@/actions/quotes/quotes-actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ContractsTable = (quotes: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filters, setFilters] = useState({
    company: "",
    quoteNo: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ company: "", quoteNo: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteQuote(id);
    router.push("/dashboard/manageQuote");
  };

  const filteredQuotes = quotes.quotes
    ? ((session?.user as any)?.role === "admin"
        ? quotes.quotes.filter((quote: any) => quote.status === "approved")
        : quotes.quotes.filter(
            (quote: any) =>
              quote.user === (session?.user as any)?._id &&
              quote.status !== "approved"
          )
      )
        .filter(
          (quote: any) =>
            quote.company?.companyName
              .toLowerCase()
              .includes(filters.company.toLowerCase()) &&
            quote.quoteNo.toString().includes(filters.quoteNo)
        )
        .sort((a: any, b: any) => b.quoteNo - a.quoteNo)
    : [];

  return (
    <div className="flex flex-col h-[93vh] bg-slate-200 w-[84vw] ml-1 shadow-xl rounded-xl overflow-hidden">
      {/* Fixed Filter Panel */}
      <div className="px-4 py-2 bg-white shadow-md z-10 sticky top-0">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Filters</h3>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
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
          <div className="relative flex-1">
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
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center"
          >
            <FaTimes className="mr-2" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Scrollable Table Content */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-orange-700 text-white">
            <tr>
              <th className="w-[40%] text-left px-2 py-1">Company</th>
              <th className="w-[15%] text-center px-2 py-1">Status</th>
              <th className="w-[15%] text-center px-2 py-1">No</th>
              <th className="w-[15%] text-right px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredQuotes.map((quote: any) => (
              <tr key={quote._id} className="border-b border-orange-400">
                <td className="w-[40%] px-2 py-0.5">
                  {quote.company?.companyName}
                </td>
                <td
                  className={`w-[15%] text-center py-0.5 font-bold ${
                    quote.status === "new" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {quote.status}
                </td>
                <td className="w-[15%] text-center py-0.5">{quote.quoteNo}</td>
                <td className="w-[15%] text-right py-0.5">
                  <Link
                    href={`/dashboard/downloadContracts/${quote._id}`}
                    className="text-xl text-orange-400 hover:text-orange-500 mr-1"
                  >
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractsTable;
