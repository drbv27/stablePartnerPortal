/* 'use client' */
import CompanyTable from "@/components/CompanyTable";
import MonthlyCharges from "@/components/MonthlyCharges";
import OneTimeCharges from "@/components/OneTimeCharges";
import PromoCode from "@/components/PromoCode";
import SpecialTerms from "@/components/SpecialTerms";
import SendComponent from "@/components/SendComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUser, getSellerUsers } from "@/actions/users/users-actions";

export default async function ShoppingPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
    return;
  }
  const users = await getSellerUsers();
  let sellerUser = [];
  if (Array.isArray(users)) {
    sellerUser = users.filter(
      (user: any) => user.email === session?.user?.email
    );
  } else {
    console.error("getSellerUsers did not return an array");
  }
  let userType = "seller";

  return (
    <div className="h-[94vh] md:h-[88vh] w-full overflow-y-auto">
      <h2 className="text-center font-bold text-lg text-orange-900">
        Review your Quote
      </h2>
      <CompanyTable />
      <MonthlyCharges />
      <OneTimeCharges />
      <PromoCode />
      <SpecialTerms especialTerms="" />
      <SendComponent />
    </div>
  );
}
