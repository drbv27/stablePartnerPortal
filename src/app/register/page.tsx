"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      console.log(formData.get("fullname"))
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard/main");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center bg-orange-100">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12 rounded-lg">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-orange-100">Partner portal Signup</h1>

        <label className="text-slate-300">Fullname:</label>
        <input
          type="text"
          placeholder="Fullname"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          name="name"
        />

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

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
