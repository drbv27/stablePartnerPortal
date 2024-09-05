import React from "react";
import QuotesTable from "@/components/QuotesTable";
import { getQuotes } from "@/actions/quotes/quotes-actions";

const ManageQuotePage = async () => {
  try {
    const { quotes } = await getQuotes();

    if (!quotes || quotes.length === 0) {
      return <div>No quotes available</div>;
    }

    return (
      <div className="p-4">
        <h1 className="text-xl text-center text-orange-700 font-semibold mb-1">
          Manage Quotes
        </h1>
        <QuotesTable quotes={quotes} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return <div>Error loading quotes</div>;
  }
};

export default ManageQuotePage;
