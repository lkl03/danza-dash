"use client"; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const validEmail = process.env.NEXT_PUBLIC_VALID_EMAIL;
    const validPassword = process.env.NEXT_PUBLIC_VALID_PASSWORD;

    if (data.email === validEmail && data.password === validPassword) {
      router.push('/home');
    } else {
      setLoginError(true);
    }
  };

  // We're using useEffect to ensure this only runs on the client and not during SSR.
  useEffect(() => {
    setLoginError(false); // Reset login error state on component mount
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-center text-3xl font-bold text-[#211f1f]">Inicia sesión para acceder a tu cuenta</h1>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#211f1f]" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              id="email"
              type="email"
              placeholder="Correo Electrónico"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#211f1f]" htmlFor="password">
              Contraseña
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              id="password"
              type="password"
              placeholder="Contraseña"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:shadow-outline">
              INGRESAR
            </button>
          </div>
        </form>
        {loginError && <p className="text-center text-red-500">Las credenciales son inválidas.</p>}
        <div className="text-center">
          <a href="#" className="text-sm text-[#211f1f] hover:underline transition-all ease-in-out">
            ¿Olvidaste tus datos?
          </a>
        </div>
      </div>
    </div>
  );
}