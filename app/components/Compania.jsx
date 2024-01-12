"use client"; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Compania() {
    const [logoPreview, setLogoPreview] = useState();
    const [coverPhotoPreview, setCoverPhotoPreview] = useState();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const logoFile = watch('logo');
    const coverPhotoFile = watch('coverPhoto');
  
    const onSubmit = (data) => {
      console.log(data);
      // Process the data submission here
      setFormSubmitted(true); // Set form submitted state to true
      setTimeout(() => setFormSubmitted(false), 5000); // Hide the message after 5 seconds
    };
  
    useEffect(() => {
      // Clean up function to revoke URL on unmount
      return () => {
        if (logoPreview) {
          URL.revokeObjectURL(logoPreview);
        }
        if (coverPhotoPreview) {
          URL.revokeObjectURL(coverPhotoPreview);
        }
      };
    }, [logoPreview, coverPhotoPreview]);
  
    // Effect for logo preview
    useEffect(() => {
      if (logoFile && logoFile.length > 0) {
        const file = logoFile[0];
        const fileUrl = URL.createObjectURL(file);
        setLogoPreview(fileUrl);
        // Clean up function to revoke URL
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      }
    }, [logoFile]);
  
    // Effect for cover photo preview
    useEffect(() => {
      if (coverPhotoFile && coverPhotoFile.length > 0) {
        const file = coverPhotoFile[0];
        const fileUrl = URL.createObjectURL(file);
        setCoverPhotoPreview(fileUrl);
        // Clean up function to revoke URL
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      }
    }, [coverPhotoFile]);
  
    // File validation function
    const validateFile = (fileList) => {
      if (fileList.length === 0) return true; // No file selected is not a validation error
      const file = fileList[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
      const isValidType = validTypes.includes(file.type);
      const isLessThan2MB = file.size < 2 * 1024 * 1024; // Less than 2MB
      return isValidType && isLessThan2MB;
    };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto bg-white p-10 rounded shadow-lg w-full max-w-4xl !my-4">
        <h2 className="text-2xl font-bold text-[#211f1f] text-center my-4">Crear Compañía</h2>
        {formSubmitted && (
          <p className="text-green-500 text-center">Compañía agregada correctamente. Por favor visita la consola para ver la información cargada.</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ... input fields ... */}

          {Object.keys(errors).length > 0 && (
            <div className="md:col-span-2">
              <p className="text-red-500 text-center">Por favor, completa todos los campos requeridos.</p>
            </div>
        )}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
            <input {...register('country', { required: true })} id="country" placeholder="Argentina" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input {...register('city', { required: true })} id="city" placeholder="Buenos Aires" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input {...register('name', { required: true })} id="name" placeholder="Teatro Colón" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="styles" className="block text-sm font-medium text-gray-700">Estilos</label>
            <input {...register('styles', { required: true })} id="styles" placeholder="Ballet clásico, contemporáneo, etc." type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="story" className="block text-sm font-medium text-gray-700">Historia</label>
            <textarea {...register('story', { required: true })} id="story" placeholder="Lorem ipsum dolor sit amet..." className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" rows="4"></textarea>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Descripción breve</label>
            <textarea {...register('shortDescription', { required: true })} id="shortDescription" placeholder="Lorem ipsum dolor sit amet..." className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" rows="4"></textarea>
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
            <input {...register('instagram', { required: true })} id="instagram" placeholder="https://instagram.com/" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="sitioweb" className="block text-sm font-medium text-gray-700">Sitio Web</label>
            <input {...register('sitioweb', { required: true })} id="sitioweb" placeholder="https://teatrocolon.org.ar/" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
            <input
              {...register('logo', { validate: validateFile })}
              id="logo"
              type="file"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              accept="image/png, image/jpeg, image/webp"
            />
            {errors.logo && <p className="text-red-500 text-xs italic">Please upload a valid PNG, JPG, or WEBP less than 2MB.</p>}
            {logoPreview && <img src={logoPreview} alt="Logo preview" className="mt-2 h-40 w-full object-cover" />}
          </div>

          <div>
            <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">Foto de portada</label>
            <input
              {...register('coverPhoto', { validate: validateFile })}
              id="coverPhoto"
              type="file"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              accept="image/png, image/jpeg, image/webp"
            />
            {errors.coverPhoto && <p className="text-red-500 text-xs italic">Please upload a valid PNG, JPG, or WEBP less than 2MB.</p>}
            {coverPhotoPreview && <img src={coverPhotoPreview} alt="Cover photo preview" className="mt-2 h-40 w-full object-cover" />}
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full mb-4 px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:shadow-outline">CREAR</button>
          </div>
        </form>
        <Link href="../home" className='text-center'>
            <div>Volver al inicio</div>
        </Link>
      </div>
    </div>
  );
}