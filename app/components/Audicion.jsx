"use client"; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Audicion() {
    const [coverPhotoPreview, setCoverPhotoPreview] = useState();
    const [isMenCheckboxChecked, setIsMenCheckboxChecked] = useState(false);
    const [isWomenCheckboxChecked, setIsWomenCheckboxChecked] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [menAge, setMenAge] = useState({ min: 18, max: 30 });
    const [womenAge, setWomenAge] = useState({ min: 18, max: 30 });
  
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm();
    const coverPhotoFile = watch('coverPhoto');
  
    const onSubmit = (data) => {
        console.log(data);
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000); // Hide the message after 5 seconds
    };

    // Clean up function to revoke URL on unmount
    useEffect(() => {
        return () => {
            if (coverPhotoPreview) {
                URL.revokeObjectURL(coverPhotoPreview);
            }
        };
    }, [coverPhotoPreview]);
  
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
        <h2 className="text-2xl font-bold text-[#211f1f] text-center my-4">Crear Audición</h2>
        {formSubmitted && (
          <p className="text-green-500 text-center">Compañía agregada correctamente. Por favor visita la consola para ver la información cargada.</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-10">
            {/* ... other form fields ... */}

            {Object.keys(errors).length > 0 && (
                <div className="md:col-span-2">
                    <p className="text-red-500 text-center">Por favor, completa todos los campos requeridos.</p>
                </div>
            )}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                <input {...register('country', { required: true })} placeholder="Argentina" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                <input {...register('city', { required: true })} placeholder="Buenos Aires" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Teatro, auditorio o lugar</label>
                <input {...register('theater', { required: true })} placeholder="Teatro Colón" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Companía</label>
                <input {...register('company', { required: true })} placeholder="Teatro Colón" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
          
          {/* Checkboxes, number inputs for positions, height, and range sliders for age */}
           <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <input 
                  type="checkbox"
                  className="mr-2 leading-tight"
                  checked={isMenCheckboxChecked}
                  onChange={(e) => setIsMenCheckboxChecked(e.target.checked)}
                />
                Géneros solicitados - Hombres
              </label>
              <div className="flex items-center gap-2 mt-1">
                <div>
                    <label htmlFor="menPositions" className="block text-sm font-medium text-gray-700">Puestos a cubrir</label>
                    <input type="number" {...register('menPositions')} min="0" placeholder='0' disabled={!isMenCheckboxChecked} className="p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                    <label htmlFor="menHeight" className="block text-sm font-medium text-gray-700">Altura mínima</label>
                    <input type="number" {...register('menHeight')} min="1" placeholder='180' disabled={!isMenCheckboxChecked} className="p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    <span> cm</span>
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700 mt-2">
                Rango de edad
              </label>
              <div className="flex gap-2">
                <input type="range" {...register('menMinAge')} min="18" max="100" disabled={!isMenCheckboxChecked} value={menAge.min} onChange={(e) => setMenAge({...menAge, min: e.target.value})} className="w-full" />
                <input type="range" {...register('menMaxAge')} min="18" max="100" disabled={!isMenCheckboxChecked} value={menAge.max} onChange={(e) => setMenAge({...menAge, max: e.target.value})} className="w-full" />
              </div>
              <div className="text-xs mt-1">
                De {menAge.min} a {menAge.max} años
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <input 
                  type="checkbox"
                  className="mr-2 leading-tight"
                  checked={isWomenCheckboxChecked}
                  onChange={(e) => setIsWomenCheckboxChecked(e.target.checked)}
                />
                Géneros solicitados - Mujeres
              </label>
              <div className="flex items-center gap-2 mt-1">
                <div>
                    <label htmlFor="womenPositions" className="block text-sm font-medium text-gray-700">Puestos a cubrir</label>
                    <input type="number" {...register('womenPositions')} min="0" disabled={!isWomenCheckboxChecked} placeholder='0' className="p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="womenHeight" className="block text-sm font-medium text-gray-700">Altura mínima</label>
                    <input type="number" {...register('womenHeight')} min="1" disabled={!isWomenCheckboxChecked} placeholder='160' className="p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none" />
                    <span> cm</span>
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700 mt-2">
                Rango de edad
              </label>
              <div className="flex gap-2">
                <input type="range" {...register('womenMinAge')} min="18" max="100" disabled={!isWomenCheckboxChecked} value={womenAge.min} onChange={(e) => setWomenAge({...womenAge, min: e.target.value})} className="w-full" />
                <input type="range" {...register('womenMaxAge')} min="18" max="100" disabled={!isWomenCheckboxChecked} value={womenAge.max} onChange={(e) => setWomenAge({...womenAge, max: e.target.value})} className="w-full" />
              </div>
              <div className="text-xs mt-1">
                De {womenAge.min} a {womenAge.max} años
              </div>
            </div>
          </div>

          {/* Text input for requested styles */}
          <div>
            <label htmlFor="stylesRequested" className="block text-sm font-medium text-gray-700">Estilos solicitados</label>
            <input {...register('stylesRequested', { required: true })} placeholder="Ballet clásico, contemporáneo, etc." className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          {/* Date pickers for registration limit and audition date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700">Límite de inscripción</label>
                <input type="date" {...register('registrationDeadline', { required: true })} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="auditionDate" className="block text-sm font-medium text-gray-700">Fecha de audición</label>
                <input type="date" {...register('auditionDate', { required: true })} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>

          {/* Text input for registration link */}
          <div>
            <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700">Link de inscripción</label>
            <input {...register('registrationLink', { required: true })} placeholder="https://teatrocolon.org.ar/inscripcion" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          {/* Text area for description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea {...register('description', { required: true })} placeholder="Lorem ipsum dolor sit amet..." className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          {/* Foto de portada */}
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