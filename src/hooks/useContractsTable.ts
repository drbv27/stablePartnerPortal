import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";

export const useContractsTable = (quotes: any[]) => {
  const { data: session } = useSession();
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

  const filteredQuotes = useMemo(() => {
    if (!quotes) return [];

    return quotes
      .filter((quote: any) => {
        if ((session?.user as any)?.role === "admin") {
          return quote.status === "approved";
        }
        return (
          quote.user === (session?.user as any)?._id &&
          quote.status !== "approved"
        );
      })
      .filter(
        (quote: any) =>
          quote.company?.companyName
            .toLowerCase()
            .includes(filters.company.toLowerCase()) &&
          quote.quoteNo.toString().includes(filters.quoteNo)
      )
      .sort((a: any, b: any) => b.quoteNo - a.quoteNo);
  }, [quotes, session, filters]);

  return { filteredQuotes, filters, handleFilterChange, clearFilters };
};
