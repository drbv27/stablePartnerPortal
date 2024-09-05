import React from "react";
import Link from "next/link";
import { FaEye, FaRegFilePdf } from "react-icons/fa";

interface QuoteRowProps {
  quote: any;
}

const QuoteRow: React.FC<QuoteRowProps> = ({ quote }) => (
  <div className="flex justify-between px-2 py-2 border-b border-orange-400">
    <div className="w-[40%]">{quote.company?.companyName}</div>
    <div
      className={`w-[15%] text-center font-bold ${
        quote.status === "new" ? "text-green-500" : "text-red-500"
      }`}
    >
      {quote.status}
    </div>
    <div className="w-[15%]">{quote.quoteNo}</div>
    <div className="w-[15%] text-right flex justify-end">
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
);

export default QuoteRow;
