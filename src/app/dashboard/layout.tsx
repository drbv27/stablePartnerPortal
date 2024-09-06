import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100  antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        {/* <Sidebar user={session.user?.name || 'Guest'} userType={userType}/> */}
        <Sidebar userType={"admin"} />
        <div className="w-[84vw] text-slate-900">{children}</div>
      </div>
    </div>
  );
}
