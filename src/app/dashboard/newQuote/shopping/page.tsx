/* 'use client' */
import CompanyTable from "@/components/CompanyTable";
import MonthlyCharges from "@/components/MonthlyCharges";
import OneTimeCharges from "@/components/OneTimeCharges";
import PromoCode from "@/components/PromoCode";
import SpecialTerms from "@/components/SpecialTerms";
import SendComponent from "@/components/SendComponent";
import { getServerSession } from "next-auth";
/* import { authOptions } from '@/app/api/auth/[...nextauth]/route'; */
import { redirect } from "next/navigation";
import { getUser, getSellerUsers } from "@/actions/users/users-actions";

export default async function ShoppingPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
    return;
  }
  const users = await getSellerUsers();
  /* const sellerUser=users.filter((user:any)=>user.email===session?.user?.email) */
  let sellerUser = [];
  if (Array.isArray(users)) {
    sellerUser = users.filter(
      (user: any) => user.email === session?.user?.email
    );
  } else {
    console.error("getSellerUsers did not return an array");
  }
  let userType = "seller";
  /* if(session.user) { */
  /* userType = (await getUser(session.user._id)).user.role; */
  //console.log(userType)
  /* } */
  //console.log('session.user:', session.user);
  //console.log('sellerUser[0]:', sellerUser[0]);
  //console.log(sellerUser[0])
  //console.log(session)
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
