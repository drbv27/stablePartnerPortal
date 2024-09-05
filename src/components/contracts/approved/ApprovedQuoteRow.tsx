// components/ApprovedQuoteRow.tsx
import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface ApprovedQuoteRowProps {
  quote: any;
}

const ApprovedQuoteRow: React.FC<ApprovedQuoteRowProps> = ({ quote }) => (
  <div className="flex justify-between px-4 py-2 border-b-2 border-orange-300">
    <div className="w-[70%]">{quote.company?.companyName}</div>
    <div className="w-[20%] text-center font-semibold">{quote.status}</div>
    <div className="w-[10%] text-right flex justify-end">
      <Link
        href={`/dashboard/aproveQuote/${quote._id}`}
        className="text-xl text-orange-500 mr-1"
      >
        <FaEye />
      </Link>
    </div>
  </div>
);

export default ApprovedQuoteRow;
