import Topbar from "@/components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100  w-[85vw] antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex flex-col h-[90vh]">
        <Topbar />

        <div className="w-full text-slate-900 md:pt-[2vh] h-[95vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
