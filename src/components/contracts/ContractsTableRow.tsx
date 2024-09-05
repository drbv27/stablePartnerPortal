// ContractsTableRow.tsx
import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface ContractsTableRowProps {
  quote: any;
}

const ContractsTableRow: React.FC<ContractsTableRowProps> = ({ quote }) => (
  <tr className="border-b border-orange-400">
    <td className="w-[40%] px-2 py-0.5">{quote.company?.companyName}</td>
    <td
      className={`w-[15%] text-center py-0.5 font-bold ${
        quote.status === "new" ? "text-green-500" : "text-red-500"
      }`}
    >
      {quote.status}
    </td>
    <td className="w-[15%] text-center py-0.5">{quote.quoteNo}</td>
    <td className="w-[15%] py-0.5">
      <div className="flex justify-end" style={{ width: "100%" }}>
        <Link
          href={`/dashboard/downloadContracts/${quote._id}`}
          className="text-xl text-orange-400 hover:text-orange-500 px-2 block"
          style={{ textAlign: "right" }}
        >
          <FaEye />
        </Link>
      </div>
    </td>
  </tr>
);

export default ContractsTableRow;
