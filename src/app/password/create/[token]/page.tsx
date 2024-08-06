'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

type Inputs = {
  password: string,
  confirmPassword: string
}

interface Props {
    params: {
      token: string;
    };
  }

const PasswordCreate = ({params}: Props) => {
  const [inputs, setInputs] = useState<Inputs>({ password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if passwords match
    if (inputs.password !== inputs.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(null), 2000); 
      return;
    }
  
    try {
        const response = await axios.post('https://api.nevtis.com/user/auth/newpass', {
            token: params.token,
            password: inputs.password
        });
        console.log(response.data);
        Swal.fire(
            'Success!',
            'Password has been created.',
            'success'
        );
    } catch (error) {
        setError("Error creating password");
        setTimeout(() => setError(null), 2000); 
        console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
      <form className="w-full max-w-sm bg-orange-100 shadow-lg rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h1 className="mb-2 text-center text-orange-900 font-semibold text-lg">Welcome to Partner Portal </h1>
        <h2 className="mb-4 text-center text-orange-900 font-semibold text-md">please create your password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password...
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password...
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-center bg-red-500 text-white">{error}</p>}
        </div>
        <button className='bg-orange-500 text-white w-full rounded-md'>Create Pass</button>
      </form>
    </div>
  );
}

export default PasswordCreate;