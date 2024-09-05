// ContractsTableHeader.tsx
import React from "react";

const ContractsTableHeader: React.FC = () => (
  <thead className="sticky top-0 bg-orange-700 text-white">
    <tr>
      <th className="w-[40%] text-left px-2 py-1">Company</th>
      <th className="w-[15%] text-center px-2 py-1">Status</th>
      <th className="w-[15%] text-center px-2 py-1">No</th>
      <th className="w-[15%] text-right px-2 py-1">Actions</th>
    </tr>
  </thead>
);

export default ContractsTableHeader;
