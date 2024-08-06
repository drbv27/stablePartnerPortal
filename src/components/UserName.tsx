'use client'
import { useSession, signOut } from "next-auth/react";

const UserName = () => {
    const { data: session, status } = useSession();

    //console.log(session, status)

  return (
    <span className="text-xs md:text-base font-bold">{session?.user?.name}</span>
  )
}

export default UserName