import { getServerSession } from "next-auth";
import { getQuotes } from "@/actions/quotes/quotes-actions";
import { getAnnouncements } from "@/actions/quotes/get-announcements-actions";
import DashBoard from "@/components/DashBoard";

export default async function MainPage() {
    const session = await getServerSession();
    const quotes = await getQuotes();
    const announcements = await getAnnouncements();
    //console.log(session?.user?.email)

  return (
    <div>
      <DashBoard quotes={quotes} announcements={announcements}/>
    </div>
  );
}