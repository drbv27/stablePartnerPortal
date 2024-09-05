"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FaEye, FaRegFilePdf, FaSearch, FaTimes } from "react-icons/fa";
import { deleteQuote } from "@/actions/quotes/quotes-actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const QuotesTable = ({ quotes }: { quotes: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [filters, setFilters] = useState({
    company: "",
    status: "",
    quoteNo: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ company: "", status: "", quoteNo: "" });
  };

  const filteredQuotes = useMemo(() => {
    if (!quotes) return [];

    return (
      (session?.user as any)?.role === "admin"
        ? quotes.filter((quote: any) =>
            ["new", "accept", "reject", "signed"].includes(quote.status)
          )
        : quotes.filter(
            (quote: any) =>
              quote.user === (session?.user as any)?._id &&
              quote.status !== "approved"
          )
    )
      .filter((quote: any) => {
        return (
          quote.company?.companyName
            .toLowerCase()
            .includes(filters.company.toLowerCase()) &&
          quote.status.toLowerCase().includes(filters.status.toLowerCase()) &&
          quote.quoteNo.toString().includes(filters.quoteNo)
        );
      })
      .sort((a: any, b: any) => b.quoteNo - a.quoteNo);
  }, [quotes, session, filters]);

  return (
    <div className="p-2 bg-slate-200 w-[84vw] ml-1 shadow-xl rounded-xl h-[93vh] overflow-y-auto">
      <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Filters</h3>
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
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center"
          >
            <FaTimes className="mr-2" />
            Clear Filters
          </button>
        </div>
      </div>

      <div className="w-full bg-orange-700 flex justify-between px-2 font-semibold text-white mt-1 rounded-t-md">
        <div className="w-[40%]">Company</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[15%]">No</div>
        <div className="w-[15%]">Actions</div>
      </div>

      <div className="px-2 bg-white rounded-lg">
        {filteredQuotes.map((quote: any) => (
          <div
            key={quote._id}
            className="flex justify-between border-b border-orange-400"
          >
            <div className="w-[40%] py-1">{quote.company?.companyName}</div>
            <div
              className={`w-[15%] text-center py-1 font-bold ${
                quote.status === "new" ? "text-green-500" : "text-red-500"
              }`}
            >
              {quote.status}
            </div>
            <div>{quote.quoteNo}</div>
            <div className="w-[15%] text-right py-1 flex justify-end">
              {quote.pdf && quote.pdf !== "pdf" && (
                <Link
                  href={`${quote.pdf}`}
                  className="text-xl text-red-400 hover:text-red-600 mr-1"
                >
                  <FaRegFilePdf />
                </Link>
              )}
              <Link
                href={`/dashboard/editQuote/company/${quote._id}`}
                className="text-xl text-orange-400 hover:text-orange-500 mr-1"
              >
                <FaEye />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesTable;
