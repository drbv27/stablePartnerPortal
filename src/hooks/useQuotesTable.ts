import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";

export const useQuotesTable = (quotes: any[]) => {
  const { data: session } = useSession();
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

  return { filteredQuotes, filters, handleFilterChange, clearFilters };
};
