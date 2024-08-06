"use client";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa6";
import { set } from 'mongoose';

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
        className="bg-slate-800 px-8 py-10 w-1/2 rounded-lg shadow-2xl shadow-orange-900"
      >
        {loading && <div className="flex items-center justify-end space-x-2 text-xl">
          <FaSpinner className="animate-spin text-white" /> {/* Spinning icon */}
          <h2 className="text-white font-semibold">Loading...</h2>
        </div>}
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-orange-100">Signin</h1>

        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          name="email"
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button className="bg-orange-500 text-white px-4 py-2 block w-full mt-4 rounded-md">
          Signup
        </button>
      </form>
      <Link href="/forgot-password" className="mt-4 ml-80 font-semibold text-orange-300 bg-slate-500 p-1 rounded"> Forgot Password? </Link>
    </div>
  );
}

export default Signin;
