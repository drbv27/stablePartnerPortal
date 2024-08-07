"use client";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa6";
import { set } from 'mongoose';
import Image from "next/image";

function Signin() {
  const [error, setError] = useState("");

const[ loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) setError(res.error as string);

    if (res?.ok) return router.push("/dashboard/main");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-orange-100">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 px-8 py-10 w-1/2 rounded-2xl shadow-2xl shadow-orange-900"
      >
        {loading && <div className="flex items-center justify-end space-x-2 text-xl">
          <FaSpinner className="animate-spin text-white" /> {/* Spinning icon */}
          <h2 className="text-white font-semibold">Loading...</h2>
        </div>}
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-7 text-orange-300">Signin</h1>
          <div>
            <Image src="/logo.png" alt="logo" width={120} height={70} />
          </div>
        </div>
        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
          name="email"
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
          name="password"
        />

        <button className="bg-orange-500 hover:bg-orange-300 text-white px-4 py-2 block w-full mt-4 rounded-md">
          Signup
        </button>
      </form>
      <Link href="/forgot-password" className="mt-8 text-sm ml-80 md:ml-96 font-semibold text-orange-800 hover:text-orange-300 bg-slate-300 hover:bg-slate-700 px-1 py-0.5 rounded-lg shadow-lg"> Forgot Password? </Link>
    </div>
  );
}

export default Signin;
