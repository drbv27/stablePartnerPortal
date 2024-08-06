import  Topbar  from "@/components/TopBar";
export default function EditLayout({ children }: {children: React.ReactNode; }) {
  return (
    <div className="bg-slate-100  w-[85vw]">
      <div className="flex flex-col h-[100vh]">
          {children} 
      </div>
    </div>
  );
}
